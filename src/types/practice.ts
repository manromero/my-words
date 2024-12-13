export type PracticeRoundStateType = "initial" | "playing" | "resume" | "error";

export type PracticePlayConfigType = {
  tags: string[];
  numberOfCards?: number;
  maxRounds?: number;
  playTime?: number;
};

export type PracticeGoToResumeType = {
  timeExpended: number;
  wordErrorIds: string[];
};

export type PracticeResumeType = {
  timeExpended: number;
  wordsLength: number;
  accuracy: number;
};

export type PracticeWordType = {
  id: string;
  word: string;
  translation: string;
};

export type PracticeRoundType = {
  initialWords: PracticeWordType[];
  suffledWords: PracticeCardType[];
  suffledTranslations: PracticeCardType[];
};

export type PracticeCardType = {
  id: string;
  value: string;
  disabled: boolean;
};
