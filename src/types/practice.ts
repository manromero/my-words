import { WordType } from "./word";

export type PracticeRoundStateType = "initial" | "playing" | "resume";

export type PracticeRoundType = {
  initialWords: WordType[];
  suffledWords: string[];
  suffledTranslations: string[];
  errors: string[];
};
