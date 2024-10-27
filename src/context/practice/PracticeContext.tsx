"use client";

import { createContext } from "react";
import {
  PracticeRoundStateType,
  PracticeRoundType,
  TagType,
  WordType,
} from "@/types";

type PracticeContextType = {
  state: PracticeRoundStateType;
  tags: TagType[];
  initialWords: WordType[];
  rounds: PracticeRoundType[];
  currentRound: number;
};

export const PracticeContext = createContext({} as PracticeContextType);
