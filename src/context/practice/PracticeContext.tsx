"use client";

import { createContext } from "react";
import {
  PracticePlayConfigType,
  PracticeGoToResumeType,
  PracticeRoundStateType,
  PracticeRoundType,
} from "@/types";

type PracticeContextType = {
  state: PracticeRoundStateType;
  rounds: PracticeRoundType[];
  currentRound?: PracticeRoundType;
  currentRoundNumber: number;
  percentageCompleted: number;
  playTime?: number;
  onPlay: (config: PracticePlayConfigType) => void;
  goToResume: (props: PracticeGoToResumeType) => void;
  startNextRound: () => void;
  restart: () => void;
};

export const PracticeContext = createContext({} as PracticeContextType);
