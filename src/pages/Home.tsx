import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Eye,
  Ear,
  PenLine,
  Hand,
  Sparkles,
  Target,
  CalendarDays,
  NotebookPen,
} from 'lucide-react';

const styles = [
  {
    icon: Eye,
    letter: 'V',
    name: 'Visual',
    desc: 'Learn best through diagrams, charts, and imagery.',
    tint: 'from-sky-500 to-blue-600',
  },
  {
    icon: Ear,
    letter: 'A',
    name: 'Auditory',
    desc: 'Absorb information by listening and discussing.',
    tint: 'from-emerald-500 to-teal-600',
  },
  {
    icon: PenLine,
    letter: 'R',
    name: 'Read/Write',
    desc: 'Thrive on written notes, lists, and textbooks.',
    tint: 'from-amber-500 to-orange-600',
  },
  {
    icon: Hand,
    letter: 'K',
    name: 'Kinesthetic',
    desc: 'Learn by doing, practicing, and real experience.',
    tint: 'from-rose-500 to-red-600',
  },
];

const features = [
  {
    icon: Target,
    title: 'Personalized profile',
    desc: 'A clear breakdown of your dominant learning styles, explained in plain language.',
  },
  {
    icon: CalendarDays,
    title: '7-day study plan',
    desc: 'A day-by-day schedule tailored to how your brain actually absorbs information.',
  },
  {
    icon: NotebookPen,
    title: 'Tactical techniques',
    desc: 'Note-taking, memory, and exam-prep methods matched to your style.',
  },
  {
    icon: Sparkles,
    title: 'AI coaching',
    desc: 'Specific, actionable guidance that references your subject and your goal.',
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-mesh">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-sky-700 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Powered by the VARK learning model
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl">
              VARKSense
              <span className="block bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                An AI Adaptive Study Coach
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Discover how you learn best. VARKSense uses the VARK model — Visual, Auditory,
              Read/Write, and Kinesthetic — to map your learning style, then builds a
              personalized study plan with AI coaching tuned to your subject and your goals.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/assessment"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:shadow-xl hover:shadow-sky-500/30 active:scale-95"
              >
                Start Assessment
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50 active:scale-95"
              >
                Learn about VARK
              </Link>
            </div>
            <p className="mt-4 text-xs font-medium text-slate-400">
              16 questions · ~3 minutes · No sign-up required
            </p>
          </div>
        </div>
      </section>

      {/* The four styles */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            The four VARK learning styles
          </h2>
          <p className="mt-4 text-slate-600">
            Everyone blends a mix of these four modes. VARKSense pinpoints your dominant
            style so your study time finally works with your brain, not against it.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {styles.map((s) => (
            <div
              key={s.letter}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className={`grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${s.tint} text-white shadow-sm`}
              >
                <s.icon className="h-6 w-6" />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-2xl font-extrabold text-slate-900">
                  {s.name}
                </span>
                <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-xs font-bold text-slate-500">
                  {s.letter}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              How VARKSense works
            </h2>
            <p className="mt-4 text-slate-600">
              Three steps from confusion to a clear, personal study roadmap.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="relative rounded-2xl border border-slate-200 bg-slate-50/50 p-6"
              >
                <span className="absolute right-5 top-5 font-display text-4xl font-extrabold text-slate-200">
                  {i + 1}
                </span>
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-slate-900 text-white">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-slate-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950 py-20">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to study the way your brain prefers?
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Take the assessment and get your AI-built study plan in minutes.
          </p>
          <Link
            to="/assessment"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-slate-900 shadow-lg transition-all hover:bg-slate-100 hover:shadow-xl active:scale-95"
          >
            Start Assessment
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
