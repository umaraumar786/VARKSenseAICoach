import { Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-sky-500 to-emerald-500 text-white">
            <BrainCircuit className="h-4.5 w-4.5" />
          </span>
          <span className="font-display text-sm font-bold text-slate-800">
            VARKSense — AI Adaptive Study Coach
          </span>
        </div>
        <p className="text-center text-xs text-slate-500">
          Built as a student project · Based on the{' '}
          <Link to="/about" className="font-medium text-sky-600 hover:underline">
            VARK learning model
          </Link>
        </p>
      </div>
    </footer>
  );
}
