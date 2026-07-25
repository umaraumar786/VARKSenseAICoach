import { Link } from 'react-router-dom';
import { Eye, Ear, PenLine, Hand, ArrowRight, BookOpen } from 'lucide-react';

const styles = [
  {
    icon: Eye,
    name: 'Visual (V)',
    desc: 'You learn best when information is presented visually — diagrams, charts, maps, graphs, and demonstrations. You think in pictures and benefit from color, spacing, and spatial organization.',
  },
  {
    icon: Ear,
    name: 'Auditory (A)',
    desc: 'You learn best through listening and speaking — lectures, discussions, podcasts, and explaining ideas out loud. Sound, tone, and verbal interaction are your strongest channels.',
  },
  {
    icon: PenLine,
    name: 'Read/Write (R)',
    desc: 'You learn best through words — reading textbooks, writing notes, and organizing information as lists, summaries, and definitions. Text is your preferred medium.',
  },
  {
    icon: Hand,
    name: 'Kinesthetic (K)',
    desc: 'You learn best by doing — practice, simulations, real-world examples, and physical engagement. You absorb ideas through action and application, not passive observation.',
  },
];

export default function About() {
  return (
    <div className="bg-mesh">
      <div className="mx-auto max-w-4xl px-5 py-10 sm:py-14">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-sky-700 shadow-sm backdrop-blur">
            <BookOpen className="h-3.5 w-3.5" />
            About VARKSense
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            What is VARK?
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
            VARK is a widely used model of learning styles developed by Neil Fleming. It
            categorizes how people prefer to take in and process information into four
            modes: <strong>Visual</strong>, <strong>Auditory</strong>,{' '}
            <strong>Read/Write</strong>, and <strong>Kinesthetic</strong>.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-slate-600">
            Most people are a blend of several styles, with one or two usually dominant.
            Understanding your profile helps you choose study techniques that genuinely fit
            how your mind works — instead of fighting against it.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {styles.map((s) => (
            <div
              key={s.name}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white">
                  <s.icon className="h-5 w-5" />
                </span>
                <h2 className="font-display text-xl font-bold text-slate-900">{s.name}</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            About this project
          </h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            VARKSense was built as a student project to demonstrate how the VARK model can be
            paired with AI to deliver personalized, practical study coaching. It is a
            single-session app — no account, no database — designed to take you from
            assessment to an actionable study plan in a few minutes.
          </p>
          <p className="mt-3 leading-relaxed text-slate-600">
            The AI guidance is generated on the fly based on your VARK scores, your subject,
            and your current academic challenge or goal, so every plan is specific to you.
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/assessment"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:shadow-xl active:scale-95"
          >
            Try the assessment
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
