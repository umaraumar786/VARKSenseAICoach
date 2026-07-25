import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, User, GraduationCap, Target, Check } from 'lucide-react';
import { QUESTIONS } from '@/lib/questions';
import { calculateVarkScores } from '@/lib/scoring';
import { useCoach } from '@/context/CoachContext';
import type { Demographics, StyleLetter } from '@/lib/types';

type Step = 'demo' | 'quiz';

const TOTAL = QUESTIONS.length;

export default function Assessment() {
  const navigate = useNavigate();
  const { demographics, setDemographics, setVarkScores } = useCoach();

  const [step, setStep] = useState<Step>('demo');
  const [demo, setDemo] = useState<Demographics>(demographics);
  const [demoError, setDemoError] = useState('');
  const [answers, setAnswers] = useState<(StyleLetter | null)[]>(
    () => Array(TOTAL).fill(null)
  );
  const [current, setCurrent] = useState(0);

  const answeredCount = useMemo(() => answers.filter(Boolean).length, [answers]);
  const allAnswered = answeredCount === TOTAL;

  function handleDemoSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!demo.name.trim() || !demo.subject.trim() || !demo.challenge.trim()) {
      setDemoError('Please fill in all three fields so your plan can be personalized.');
      return;
    }
    setDemographics(demo);
    setDemoError('');
    setStep('quiz');
  }

  function selectAnswer(qIndex: number, letter: StyleLetter) {
    setAnswers((prev) => {
      const next = [...prev];
      next[qIndex] = letter;
      return next;
    });
    if (qIndex < TOTAL - 1) {
      window.setTimeout(() => setCurrent(qIndex + 1), 180);
    }
  }

  function handleSubmit() {
    if (!allAnswered) return;
    setDemographics(demo);
    setVarkScores(calculateVarkScores(answers));
    navigate('/results');
  }

  // --- Demographics step ---
  if (step === 'demo') {
    return (
      <div className="bg-mesh">
        <div className="mx-auto max-w-2xl px-5 py-10 sm:py-14">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-sky-700 shadow-sm backdrop-blur">
              Step 1 of 2
            </span>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Tell us about you
            </h1>
            <p className="mx-auto mt-3 max-w-md text-slate-600">
              A few details so your study plan can be tailored to your subject and your goal.
            </p>
          </div>

          <form
            onSubmit={handleDemoSubmit}
            className="mt-10 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <Field
              icon={User}
              label="Your name"
              hint="What should we call you?"
            >
              <input
                type="text"
                value={demo.name}
                onChange={(e) => setDemo({ ...demo, name: e.target.value })}
                placeholder="e.g. Alex"
                className="input"
              />
            </Field>

            <Field
              icon={GraduationCap}
              label="Field of study / subject"
              hint="What are you studying right now?"
            >
              <input
                type="text"
                value={demo.subject}
                onChange={(e) => setDemo({ ...demo, subject: e.target.value })}
                placeholder="e.g. Organic Chemistry, AP History, CS101"
                className="input"
              />
            </Field>

            <Field
              icon={Target}
              label="Biggest academic challenge or goal"
              hint="What's pressing right now?"
            >
              <input
                type="text"
                value={demo.challenge}
                onChange={(e) => setDemo({ ...demo, challenge: e.target.value })}
                placeholder='e.g. "Final exam in 5 days"'
                className="input"
              />
            </Field>

            {demoError && (
              <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                {demoError}
              </p>
            )}

            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:shadow-xl active:scale-95"
            >
              Continue to the questionnaire
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Quiz step ---
  const q = QUESTIONS[current];
  const progress = ((current + 1) / TOTAL) * 100;

  return (
    <div className="bg-mesh min-h-[calc(100vh-64px)]">
      <div className="mx-auto max-w-2xl px-5 py-8 sm:py-12">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm font-medium text-slate-600">
            <span>
              Question {current + 1} of {TOTAL}
            </span>
            <span>{answeredCount} answered</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div
          key={q.id}
          className="animate-float-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2 className="font-display text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
            {q.prompt}
          </h2>

          <div className="mt-5 space-y-3">
            {q.options.map((opt) => {
              const selected = answers[current] === opt.letter;
              return (
                <button
                  key={opt.letter}
                  type="button"
                  onClick={() => selectAnswer(current, opt.letter)}
                  className={`flex w-full items-center gap-3 rounded-xl border-2 px-4 py-4 text-left transition-all ${
                    selected
                      ? 'border-sky-500 bg-sky-50 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                      selected
                        ? 'border-sky-500 bg-sky-500 text-white'
                        : 'border-slate-300 text-transparent'
                    }`}
                  >
                    {selected && <Check className="h-4 w-4" />}
                  </span>
                  <span className="text-sm font-medium text-slate-700 sm:text-base">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Nav controls */}
        <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          {current < TOTAL - 1 ? (
            <button
              type="button"
              onClick={() => setCurrent((c) => Math.min(TOTAL - 1, c + 1))}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-95"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
            >
              Submit & see results
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>

        {!allAnswered && current === TOTAL - 1 && (
          <p className="mt-4 text-center text-xs font-medium text-slate-500">
            Answer all {TOTAL} questions to submit ({answeredCount}/{TOTAL} done)
          </p>
        )}
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #cbd5e1;
          background: #fff;
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          color: #0f172a;
          outline: none;
          transition: border-color .15s, box-shadow .15s;
        }
        .input:focus {
          border-color: #0ea5e9;
          box-shadow: 0 0 0 3px rgba(14,165,233,0.15);
        }
        .input::placeholder { color: #94a3b8; }
      `}</style>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  hint,
  children,
}: {
  icon: typeof User;
  label: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center gap-2 text-sm font-semibold text-slate-800">
        <Icon className="h-4 w-4 text-sky-600" />
        {label}
      </span>
      <span className="mt-0.5 block text-xs text-slate-500">{hint}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
