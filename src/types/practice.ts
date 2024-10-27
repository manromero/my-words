import { WordType } from "./word";

export type PracticeRoundStateType = "initial" | "playing" | "resume";

export type PracticeRoundType = {
  initialWords: WordType[];
  suffledWords: PracticeCardType[];
  suffledTranslations: PracticeCardType[];
  errors: string[];
};

export type PracticeCardType = {
  value: string;
  disabled: boolean;
};
