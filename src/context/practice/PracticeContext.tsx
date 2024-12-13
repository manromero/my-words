"use client";

import { createContext } from "react";
import {
  PracticePlayConfigType,
  PracticeGoToResumeType,
  PracticeRoundStateType,
  PracticeRoundType,
  PracticeResumeType,
} from "@/types";

type PracticeContextType = {
  state: PracticeRoundStateType;
  rounds: PracticeRoundType[];
  currentRound?: PracticeRoundType;
  currentRoundNumber: number;
  percentageCompleted: number;
  playTime?: number;
  resume: PracticeResumeType;
  onPlay: (config: PracticePlayConfigType) => void;
  goToResume: (props: PracticeGoToResumeType) => void;
  startNextRound: () => void;
  restart: () => void;
};

export const PracticeContext = createContext({} as PracticeContextType);
