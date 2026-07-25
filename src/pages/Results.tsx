import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { ArrowRight, Loader2, AlertCircle, Sparkles, ArrowLeft } from 'lucide-react';
import { useCoach } from '@/context/CoachContext';
import { STYLE_META } from '@/lib/scoring';
import { generatePlan } from '@/lib/api';
import type { CoachPlan } from '@/lib/types';

export default function Results() {
  const navigate = useNavigate();
  const { demographics, varkScores, plan, setPlan } = useCoach();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fetchedRef = useRef(false);

  const scores = varkScores;

  useEffect(() => {
    if (!scores) {
      navigate('/assessment', { replace: true });
      return;
    }
    if (plan || fetchedRef.current) return;
    fetchedRef.current = true;
    setLoading(true);
    setError('');
    generatePlan(scores, demographics)
      .then((p: CoachPlan) => setPlan(p))
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Something went wrong.');
      })
      .finally(() => setLoading(false));
  }, [scores, plan, demographics, navigate, setPlan]);

  if (!scores) return null;

  const chartData = [
    { name: 'Visual', value: scores.visual, color: STYLE_META.visual.color },
    { name: 'Auditory', value: scores.auditory, color: STYLE_META.auditory.color },
    { name: 'Read/Write', value: scores.readWrite, color: STYLE_META.readWrite.color },
    { name: 'Kinesthetic', value: scores.kinesthetic, color: STYLE_META.kinesthetic.color },
  ];

  const sorted = [...chartData].sort((a, b) => b.value - a.value);
  const dominant = sorted[0];

  return (
    <div className="bg-mesh min-h-[calc(100vh-64px)]">
      <div className="mx-auto max-w-4xl px-5 py-8 sm:py-12">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Your VARK profile
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            {demographics.name ? `Here you go, ${demographics.name}` : 'Here are your results'}
          </h1>
          <p className="mx-auto mt-2 max-w-md text-slate-600">
            Based on your answers, here's how your learning preferences break down.
          </p>
        </div>

        {/* Chart + dominant */}
        <div className="mt-7 grid gap-5 lg:grid-cols-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">
            <h2 className="font-display text-lg font-bold text-slate-900">
              Your style breakdown
            </h2>
            <p className="text-sm text-slate-500">Percentage of answers per VARK mode</p>
            <div className="mt-3 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#475569' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#475569' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(148,163,184,0.12)' }}
                    contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }}
                    formatter={(v) => [`${v}%`, 'Score']}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={72}>
                    {chartData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-2">
            <div
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              style={{ borderTopColor: dominant.color, borderTopWidth: 4 }}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Dominant style
              </p>
              <p className="mt-1 font-display text-3xl font-extrabold" style={{ color: dominant.color }}>
                {dominant.name}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {dominant.value}% of your answers pointed here.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Quick scores
              </p>
              <ul className="mt-3 space-y-2">
                {chartData.map((d) => (
                  <li key={d.name} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium text-slate-700">
                      <span className="h-3 w-3 rounded-full" style={{ background: d.color }} />
                      {d.name}
                    </span>
                    <span className="font-semibold text-slate-900">{d.value}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* AI explanation */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-xl font-bold text-slate-900">
            What your profile means
          </h2>

          {loading && (
            <div className="mt-5 flex flex-col items-center justify-center gap-3 py-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin text-sky-600" />
              <p className="text-sm font-medium text-slate-600">
                Your AI coach is reading your profile and building your plan…
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="mt-5 rounded-xl bg-rose-50 px-5 py-4 text-sm text-rose-700">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-semibold">We couldn't generate your AI plan.</p>
                  <p className="mt-1 text-rose-600">{error}</p>
                  <button
                    onClick={() => {
                      fetchedRef.current = false;
                      setError('');
                      setPlan(null);
                    }}
                    className="mt-3 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && plan && (
            <>
              <p className="mt-3 leading-relaxed text-slate-700">{plan.profile_explanation}</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => navigate('/coach')}
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:shadow-xl active:scale-95"
                >
                  View My Coach Dashboard
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </button>
                <button
                  onClick={() => navigate('/assessment')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-95"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retake assessment
                </button>
              </div>
            </>
          )}

          {!loading && !error && !plan && (
            <p className="mt-3 text-sm text-slate-500">Waiting for your plan…</p>
          )}
        </div>
      </div>
    </div>
  );
}
