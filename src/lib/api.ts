import type { CoachPlan, Demographics, VarkScores } from './types';

export async function generatePlan(
  varkScores: VarkScores,
  demographics: Demographics
): Promise<CoachPlan> {
  const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-plan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      varkScores,
      subject: demographics.subject,
      challenge: demographics.challenge,
      name: demographics.name,
    }),
  });

  if (!res.ok) {
    throw new Error(`Coach service error (${res.status})`);
  }
  return (await res.json()) as CoachPlan;
}
