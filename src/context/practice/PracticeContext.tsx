"use client";

import { createContext } from "react";
import {
  PracticePlayConfig,
  PracticeRoundStateType,
  PracticeRoundType,
} from "@/types";

type PracticeContextType = {
  state: PracticeRoundStateType;
  rounds: PracticeRoundType[];
  currentRound: PracticeRoundType;
  currentRoundNumber: number;
  percentageCompleted: number;
  onPlay: (config: PracticePlayConfig) => void;
  startNextRound: () => void;
  restart: () => void;
};

export const PracticeContext = createContext({} as PracticeContextType);
