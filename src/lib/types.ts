export type StyleLetter = 'V' | 'A' | 'R' | 'K';

export interface QuestionOption {
  letter: StyleLetter;
  text: string;
}

export interface Question {
  id: number;
  prompt: string;
  options: QuestionOption[];
}

export interface VarkScores {
  visual: number;
  auditory: number;
  readWrite: number;
  kinesthetic: number;
}

export interface Demographics {
  name: string;
  subject: string;
  challenge: string;
}

export interface WeeklyPlanDay {
  day: string;
  focus: string;
}

export interface CoachPlan {
  profile_explanation: string;
  study_strategies: string[];
  weekly_plan: WeeklyPlanDay[];
  revision_tips: string[];
  note_taking_methods: string[];
  memory_techniques: string[];
  exam_prep_advice: string;
}

export interface AssessmentState {
  demographics: Demographics;
  answers: (StyleLetter | null)[];
}
