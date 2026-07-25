import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Brain,
  CalendarDays,
  RotateCcw,
  Lightbulb,
  NotebookPen,
  BrainCog,
  ClipboardCheck,
  FileDown,
  ChevronDown,
  ArrowLeft,
} from 'lucide-react';
import jsPDF from 'jspdf';
import { useCoach } from '@/context/CoachContext';
import type { CoachPlan } from '@/lib/types';

type TabKey =
  | 'study_strategies'
  | 'weekly_plan'
  | 'revision_tips'
  | 'note_taking_methods'
  | 'memory_techniques'
  | 'exam_prep_advice';

const TABS: { key: TabKey; label: string; icon: typeof Brain }[] = [
  { key: 'study_strategies', label: 'Study Strategies', icon: Brain },
  { key: 'weekly_plan', label: 'Weekly Plan', icon: CalendarDays },
  { key: 'revision_tips', label: 'Revision Tips', icon: RotateCcw },
  { key: 'note_taking_methods', label: 'Note-Taking', icon: NotebookPen },
  { key: 'memory_techniques', label: 'Memory Techniques', icon: BrainCog },
  { key: 'exam_prep_advice', label: 'Exam Prep', icon: ClipboardCheck },
];

export default function Coach() {
  const navigate = useNavigate();
  const { plan, demographics, varkScores } = useCoach();
  const [active, setActive] = useState<TabKey>('study_strategies');
  const [openMobile, setOpenMobile] = useState<TabKey | null>('study_strategies');
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!plan) navigate('/results', { replace: true });
  }, [plan, navigate]);

  if (!plan || !varkScores) return null;

  function handleDownloadPdf() {
    if (!plan || !varkScores || !printRef.current) return;
    const scores = varkScores;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const marginX = 48;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const maxWidth = pageWidth - marginX * 2;
    let y = 56;

    const addHeading = (text: string, size = 15) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(size);
      doc.setTextColor(15, 23, 42);
      const lines = doc.splitTextToSize(text, maxWidth);
      if (y + lines.length * size + 8 > pageHeight - 48) {
        doc.addPage();
        y = 56;
      }
      doc.text(lines, marginX, y);
      y += lines.length * size + 6;
    };

    const addParagraph = (text: string, size = 10.5) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(size);
      doc.setTextColor(51, 65, 85);
      const lines = doc.splitTextToSize(text, maxWidth);
      if (y + lines.length * (size + 3) > pageHeight - 48) {
        doc.addPage();
        y = 56;
      }
      doc.text(lines, marginX, y);
      y += lines.length * (size + 3) + 4;
    };

    const addBullets = (items: string[]) => {
      doc.setFontSize(10.5);
      items.forEach((item) => {
        const wrapped = doc.splitTextToSize(item, maxWidth - 18);
        if (y + wrapped.length * 14 > pageHeight - 48) {
          doc.addPage();
          y = 56;
        }
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(51, 65, 85);
        doc.text('•', marginX, y);
        doc.text(wrapped, marginX + 14, y);
        y += wrapped.length * 14 + 4;
      });
    };

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(2, 132, 199);
    doc.text('VARKSense — AI Study Coach', marginX, y);
    y += 24;
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(
      `Student: ${demographics.name || '—'}   |   Subject: ${demographics.subject || '—'}   |   Goal: ${demographics.challenge || '—'}`,
      marginX,
      y
    );
    y += 8;
    doc.text(
      `VARK: Visual ${scores.visual}% · Auditory ${scores.auditory}% · Read/Write ${scores.readWrite}% · Kinesthetic ${scores.kinesthetic}%`,
      marginX,
      y
    );
    y += 16;
    doc.setDrawColor(226, 232, 240);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 18;

    addHeading('Your Profile');
    addParagraph(plan.profile_explanation);

    addHeading('Study Strategies');
    addBullets(plan.study_strategies);

    addHeading('Weekly Plan');
    plan.weekly_plan.forEach((d) => {
      addParagraph(`${d.day}: ${d.focus}`, 10.5);
    });

    addHeading('Revision Tips');
    addBullets(plan.revision_tips);

    addHeading('Note-Taking Methods');
    addBullets(plan.note_taking_methods);

    addHeading('Memory Techniques');
    addBullets(plan.memory_techniques);

    addHeading('Exam Prep Advice');
    addParagraph(plan.exam_prep_advice);

    doc.save('VARKSense-Study-Plan.pdf');
  }

  return (
    <div className="bg-mesh min-h-[calc(100vh-64px)]">
      <div className="mx-auto max-w-4xl px-5 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-sky-700 shadow-sm backdrop-blur">
              Your Coach Dashboard
            </span>
            <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {demographics.name ? `${demographics.name}'s Study Plan` : 'Your Study Plan'}
            </h1>
            <p className="mt-1.5 text-sm text-slate-600">
              {demographics.subject} · {demographics.challenge}
            </p>
          </div>
          <button
            onClick={handleDownloadPdf}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 active:scale-95"
          >
            <FileDown className="h-4.5 w-4.5" />
            Download as PDF
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => navigate('/results')}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-50"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to results
          </button>
          <button
            onClick={() => navigate('/assessment')}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Retake assessment
          </button>
        </div>

        {/* Tabs (desktop) */}
        <div className="mt-6 hidden gap-1 overflow-x-auto border-b border-slate-200 sm:flex scrollbar-thin">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                active === t.key
                  ? 'border-sky-600 text-sky-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Accordion (mobile) */}
        <div className="mt-6 space-y-2 sm:hidden">
          {TABS.map((t) => (
            <div key={t.key} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <button
                onClick={() =>
                  setOpenMobile((cur) => (cur === t.key ? null : t.key))
                }
                className="flex w-full items-center justify-between px-4 py-3.5 text-left"
              >
                <span className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <t.icon className="h-4 w-4 text-sky-600" />
                  {t.label}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${openMobile === t.key ? 'rotate-180' : ''}`}
                />
              </button>
              {openMobile === t.key && (
                <div className="border-t border-slate-100 px-4 py-4">
                  <SectionContent tab={t.key} plan={plan} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Panel (desktop) */}
        <div ref={printRef} className="mt-5 hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:block sm:p-7">
          <SectionContent tab={active} plan={plan} />
        </div>
      </div>
    </div>
  );
}

function SectionContent({ tab, plan }: { tab: TabKey; plan: CoachPlan }) {
  switch (tab) {
    case 'study_strategies':
      return <BulletList items={plan.study_strategies} icon={Brain} />;
    case 'weekly_plan':
      return (
        <div className="overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <th className="px-4 py-3 font-semibold">Day</th>
                <th className="px-4 py-3 font-semibold">Focus</th>
              </tr>
            </thead>
            <tbody>
              {plan.weekly_plan.map((d, i) => (
                <tr key={d.day} className={i % 2 ? 'bg-slate-50/40' : 'bg-white'}>
                  <td className="whitespace-nowrap px-4 py-3 font-semibold text-slate-800">
                    {d.day}
                  </td>
                  <td className="px-4 py-3 text-slate-700">{d.focus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'revision_tips':
      return <BulletList items={plan.revision_tips} icon={RotateCcw} />;
    case 'note_taking_methods':
      return <BulletList items={plan.note_taking_methods} icon={NotebookPen} />;
    case 'memory_techniques':
      return <BulletList items={plan.memory_techniques} icon={BrainCog} />;
    case 'exam_prep_advice':
      return (
        <p className="leading-relaxed text-slate-700">{plan.exam_prep_advice}</p>
      );
  }
}

function BulletList({ items, icon: Icon }: { items: string[]; icon: typeof Brain }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-sky-50 text-sky-600">
            <Icon className="h-4 w-4" />
          </span>
          <span className="leading-relaxed text-slate-700">{item}</span>
        </li>
      ))}
    </ul>
  );
}
