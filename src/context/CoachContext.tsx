import { createContext, useContext, useState, type ReactNode } from 'react';
import type { CoachPlan, Demographics, VarkScores } from '@/lib/types';

interface CoachContextValue {
  demographics: Demographics;
  setDemographics: (d: Demographics) => void;
  varkScores: VarkScores | null;
  setVarkScores: (s: VarkScores | null) => void;
  plan: CoachPlan | null;
  setPlan: (p: CoachPlan | null) => void;
}

const CoachContext = createContext<CoachContextValue | undefined>(undefined);

const emptyDemo: Demographics = { name: '', subject: '', challenge: '' };

export function CoachProvider({ children }: { children: ReactNode }) {
  const [demographics, setDemographics] = useState<Demographics>(emptyDemo);
  const [varkScores, setVarkScores] = useState<VarkScores | null>(null);
  const [plan, setPlan] = useState<CoachPlan | null>(null);

  return (
    <CoachContext.Provider
      value={{ demographics, setDemographics, varkScores, setVarkScores, plan, setPlan }}
    >
      {children}
    </CoachContext.Provider>
  );
}

export function useCoach() {
  const ctx = useContext(CoachContext);
  if (!ctx) throw new Error('useCoach must be used within CoachProvider');
  return ctx;
}
