import type { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: 'When learning something new, I prefer to:',
    options: [
      { letter: 'V', text: 'See a diagram or chart' },
      { letter: 'A', text: 'Listen to someone explain it' },
      { letter: 'R', text: 'Read a detailed written explanation' },
      { letter: 'K', text: 'Try it hands-on immediately' },
    ],
  },
  {
    id: 2,
    prompt: 'When studying for an exam, I mostly:',
    options: [
      { letter: 'V', text: 'Use color-coded notes, mind maps, or charts' },
      { letter: 'A', text: 'Talk through concepts out loud or discuss with others' },
      { letter: 'R', text: 'Rewrite notes and read textbooks' },
      { letter: 'K', text: 'Use practice problems and real examples' },
    ],
  },
  {
    id: 3,
    prompt: 'I remember things best when I:',
    options: [
      { letter: 'V', text: 'Picture them in my mind' },
      { letter: 'A', text: 'Hear them explained' },
      { letter: 'R', text: 'Write them down' },
      { letter: 'K', text: 'Physically do or practice them' },
    ],
  },
  {
    id: 4,
    prompt: 'In a classroom, I learn best when the teacher:',
    options: [
      { letter: 'V', text: 'Uses slides, images, and visual aids' },
      { letter: 'A', text: 'Explains verbally and encourages discussion' },
      { letter: 'R', text: 'Provides handouts and written material' },
      { letter: 'K', text: 'Includes hands-on activities or demonstrations' },
    ],
  },
  {
    id: 5,
    prompt: 'When assembling something new, I:',
    options: [
      { letter: 'V', text: 'Look at diagrams/pictures in the instructions' },
      { letter: 'A', text: 'Ask someone or call for verbal guidance' },
      { letter: 'R', text: 'Read the instruction manual step by step' },
      { letter: 'K', text: 'Just start assembling and figure it out' },
    ],
  },
  {
    id: 6,
    prompt: 'My notes usually include:',
    options: [
      { letter: 'V', text: 'Diagrams, arrows, and highlighting' },
      { letter: 'A', text: 'Few notes — I remember what was said' },
      { letter: 'R', text: 'Detailed written sentences and lists' },
      { letter: 'K', text: 'Examples and things I can act out or apply' },
    ],
  },
  {
    id: 7,
    prompt: 'I prefer explanations that:',
    options: [
      { letter: 'V', text: 'Include visuals like graphs or images' },
      { letter: 'A', text: 'Are spoken aloud, like a lecture or podcast' },
      { letter: 'R', text: 'Are written clearly, step-by-step' },
      { letter: 'K', text: 'Involve a demonstration or real activity' },
    ],
  },
  {
    id: 8,
    prompt: "When I'm confused about a topic, I:",
    options: [
      { letter: 'V', text: 'Look for a diagram or video' },
      { letter: 'A', text: 'Ask someone to explain it verbally' },
      { letter: 'R', text: 'Look for a written explanation or article' },
      { letter: 'K', text: 'Try working through an example myself' },
    ],
  },
  {
    id: 9,
    prompt: 'I concentrate best when:',
    options: [
      { letter: 'V', text: 'My environment is visually organized and clear' },
      { letter: 'A', text: 'I can hear things clearly, no noise' },
      { letter: 'R', text: 'I have quiet time to read' },
      { letter: 'K', text: 'I can move around or take breaks' },
    ],
  },
  {
    id: 10,
    prompt: 'To remember a phone number or code, I:',
    options: [
      { letter: 'V', text: 'Picture the numbers in my head' },
      { letter: 'A', text: 'Repeat it out loud' },
      { letter: 'R', text: 'Write it down' },
      { letter: 'K', text: 'Type it out physically multiple times' },
    ],
  },
  {
    id: 11,
    prompt: 'I prefer tests/exams that include:',
    options: [
      { letter: 'V', text: 'Diagrams to label or interpret' },
      { letter: 'A', text: 'Oral exams or discussions' },
      { letter: 'R', text: 'Essay or written answer questions' },
      { letter: 'K', text: 'Practical or hands-on tasks' },
    ],
  },
  {
    id: 12,
    prompt: 'When giving directions to a place, I:',
    options: [
      { letter: 'V', text: 'Draw a map' },
      { letter: 'A', text: 'Explain it verbally' },
      { letter: 'R', text: 'Write down the directions' },
      { letter: 'K', text: 'Walk with them or show physically' },
    ],
  },
  {
    id: 13,
    prompt: 'I enjoy learning through:',
    options: [
      { letter: 'V', text: 'Videos and infographics' },
      { letter: 'A', text: 'Podcasts and lectures' },
      { letter: 'R', text: 'Books and articles' },
      { letter: 'K', text: 'Workshops and practice sessions' },
    ],
  },
  {
    id: 14,
    prompt: 'When I read a textbook, I:',
    options: [
      { letter: 'V', text: 'Focus on diagrams, images, and charts' },
      { letter: 'A', text: 'Read it aloud or subvocalize' },
      { letter: 'R', text: 'Focus closely on the written text' },
      { letter: 'K', text: 'Skim and look for practical examples' },
    ],
  },
  {
    id: 15,
    prompt: 'My ideal way to revise before an exam is:',
    options: [
      { letter: 'V', text: 'Reviewing visual summaries/mind maps' },
      { letter: 'A', text: 'Discussing topics with a study group' },
      { letter: 'R', text: 'Re-reading and rewriting notes' },
      { letter: 'K', text: 'Doing practice questions and simulations' },
    ],
  },
  {
    id: 16,
    prompt: "I understand a new concept best when it's:",
    options: [
      { letter: 'V', text: 'Shown to me visually' },
      { letter: 'A', text: 'Explained to me in conversation' },
      { letter: 'R', text: 'Something I can read about' },
      { letter: 'K', text: 'Something I can try out myself' },
    ],
  },
];
