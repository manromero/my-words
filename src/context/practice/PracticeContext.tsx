"use client";

import { createContext } from "react";
import { PracticeRoundStateType, PracticeRoundType, WordType } from "@/types";

type PracticeContextType = {
  state: PracticeRoundStateType;
  rounds: PracticeRoundType[];
  currentRound: PracticeRoundType;
  currentRoundNumber: number;
  percentageCompleted: number;
  onPlay: (tags: string[]) => void;
  startNextRound: () => void;
};

export const PracticeContext = createContext({} as PracticeContextType);
