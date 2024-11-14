export type PracticeRoundStateType = "initial" | "playing" | "resume";

export type PracticePlayConfig = {
  tags: string[];
  numberOfCards?: number;
  maxRounds?: number;
  playTime?: number;
};

export type PracticeWordType = {
  word: string;
  translation: string;
};

export type PracticeRoundType = {
  initialWords: PracticeWordType[];
  suffledWords: PracticeCardType[];
  suffledTranslations: PracticeCardType[];
  errors: string[];
};

export type PracticeCardType = {
  value: string;
  disabled: boolean;
};
