import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const systemInstruction = `You are VARKSense, a warm, supportive and encouraging AI Study coach that creates personalized study plans based on a student's VARK learning style profile (Visual, Auditory, Read/Write, Kinesthetic).

You will receive:
1. The student's VARK scores as percentages (Visual, Auditory, Read/Write, Kinesthetic)
2. Basic context: their field of study or subject or domain, their current biggest academic challenge or upcoming goal, and how much available study time they have per day.

Your task is to generate personalized, practical, well-defined, and specific study plan based on their DOMINANT learning style(s). Do not give any generic study advice; every recommendation must clearly be linked to their specific dominant learning style.

Respond ONLY in valid JSON, with no markdown formatting, no code fences, and no text outside the JSON object. Use exactly this structure:

{
  "profile_explanation": "3-4 sentences elaborating what their specific VARK profile means for how they can learn best, written directly to the student in a warm, encouraging, and supportive tone.",
  "study_strategies": ["4-5 specific, actionable study techniques suited to their dominant style(s) and realistic within their available daily study time"],
  "weekly_plan": [{"day": "Monday", "focus": "..."}, {"day": "Tuesday", "focus": "..."}, {"day": "Wednesday", "focus": "..."}, {"day": "Thursday", "focus": "..."}, {"day": "Friday", "focus": "..."}, {"day": "Saturday", "focus": "..."}, {"day": "Sunday", "focus": "..."}],
  "revision_tips": ["3-4 revision techniques according to their learning style"],
  "note_taking_methods": ["3-4 specific note-taking approaches matched to their style"],
  "memory_techniques": ["3-4 memory/retention techniques suited to their learning style"],
  "exam_prep_advice": "5-6 sentences of exam-day and pre-exam preparation advice"
}

Guidelines:
- Be concrete and doable, not vague
- Reference their subject/challenge/study time available context when relevant
- If two styles are closely tied (within 20% of each other), blend recommendations across both styles and mention the reason why you are blending
- Keep tone warm, encouraging, and coach-like
- Do not include any text, explanation, or notes outside the JSON object`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { varkScores, subject, challenge } = await req.json();

    const userMessage = `VARK Scores: Visual ${varkScores.visual}%, Auditory ${varkScores.auditory}%, Read/Write ${varkScores.readWrite}%, Kinesthetic ${varkScores.kinesthetic}%. Subject: ${subject}. Challenge/Goal: ${challenge}.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${Deno.env.get("GEMINI_API_KEY")}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents: [{ parts: [{ text: userMessage }] }],
          generationConfig: { responseMimeType: "application/json" },
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return new Response(
        JSON.stringify({ error: `Gemini API error: ${response.status}`, detail: errText }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const aiText = data.candidates[0].content.parts[0].text;
    const parsed = JSON.parse(aiText);

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
