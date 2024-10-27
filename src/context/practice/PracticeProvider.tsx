"use client";

import React, { useState } from "react";

import { PracticeContext } from "./PracticeContext";

import { PracticeRoundStateType } from "@/types";

type PracticeProviderType = {
  children: React.ReactNode;
};

export const PracticeProvider = ({
  children,
}: PracticeProviderType): JSX.Element => {
  const [state, setState] = useState<PracticeRoundStateType>("initial");
  const [tags, setTags] = useState([]);
  const [initialWords, setInitialWords] = useState([]);
  const [rounds, setRounds] = useState([]);
  const [currentRound, setCurrentRound] = useState(0);

  return (
    <PracticeContext.Provider
      value={{ state, tags, initialWords, rounds, currentRound }}
    >
      {children}
    </PracticeContext.Provider>
  );
};
