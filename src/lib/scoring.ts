import type { StyleLetter, VarkScores } from './types';

export function calculateVarkScores(answers: (StyleLetter | null)[]): VarkScores {
  const counts = { V: 0, A: 0, R: 0, K: 0 };
  for (const a of answers) {
    if (a) counts[a] += 1;
  }
  const total = answers.length || 1;
  const pct = (n: number) => Math.round((n / total) * 100);
  return {
    visual: pct(counts.V),
    auditory: pct(counts.A),
    readWrite: pct(counts.R),
    kinesthetic: pct(counts.K),
  };
}

export const STYLE_META = {
  visual: { letter: 'V', label: 'Visual', color: '#3b82f6' },
  auditory: { letter: 'A', label: 'Auditory', color: '#10b981' },
  readWrite: { letter: 'R', label: 'Read/Write', color: '#f59e0b' },
  kinesthetic: { letter: 'K', label: 'Kinesthetic', color: '#ef4444' },
} as const;
