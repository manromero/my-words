"use client";

import React, { useState } from "react";

import { PracticeContext } from "./PracticeContext";

import { PracticeRoundStateType, PracticeRoundType, WordType } from "@/types";
import { useWords } from "@/hooks";
import { suffleArray } from "@/utils";

type PracticeProviderType = {
  children: React.ReactNode;
};

const ROUND_WORDS_SIZE = 5;

export const PracticeProvider = ({
  children,
}: PracticeProviderType): JSX.Element => {
  useWords();
  const [state, setState] = useState<PracticeRoundStateType>("initial");
  const [rounds, setRounds] = useState<PracticeRoundType[]>([]);
  const [currentRoundNumber, setCurrentRoundNumber] = useState(0);
  const { data: words } = useWords();

  const generateRounds = (words: WordType[]): PracticeRoundType[] => {
    const suffledWords = suffleArray(words);
    const rounds: PracticeRoundType[] = [];

    while (suffledWords.length) {
      const initialWords = [];
      for (let i = 0; i < ROUND_WORDS_SIZE; i++) {
        const wordPoped = suffledWords.pop();
        if (!wordPoped) {
          break;
        }
        initialWords.push(wordPoped);
      }
      const round: PracticeRoundType = {
        initialWords,
        suffledWords: suffleArray(
          initialWords.map((w) => ({
            value: w.word as string,
            disabled: false,
          }))
        ),
        suffledTranslations: suffleArray(
          initialWords.map((w) => ({
            value: w.translation as string,
            disabled: false,
          }))
        ),
        errors: [],
      };
      rounds.push(round);
    }
    return rounds;
  };

  const handlePlay = (tags: string[]) => {
    const filteredWords = words
      .filter(({ tags }) => {
        return tags?.some((wordTagId) => tags.includes(wordTagId));
      })
      .map((w) => ({ ...w }));
    const generatedRounds = generateRounds(filteredWords);
    setRounds(generatedRounds);
    setState("playing");
  };

  return (
    <PracticeContext.Provider
      value={{
        state,
        rounds,
        currentRound: rounds[currentRoundNumber],
        currentRoundNumber,
        onPlay: handlePlay,
      }}
    >
      {children}
    </PracticeContext.Provider>
  );
};
