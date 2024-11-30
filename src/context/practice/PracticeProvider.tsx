"use client";

import React, { useState } from "react";

import { PracticeContext } from "./PracticeContext";

import {
  PracticePlayConfig,
  PracticeRoundStateType,
  PracticeRoundType,
  PracticeWordType,
} from "@/types";
import { useWords } from "@/hooks";
import { suffleArray } from "@/utils";

type PracticeProviderType = {
  children: React.ReactNode;
};

const DEFAULT_NUMBER_OF_CARDS = 5;

export const PracticeProvider = ({
  children,
}: PracticeProviderType): JSX.Element => {
  useWords();
  const [state, setState] = useState<PracticeRoundStateType>("initial");
  const [rounds, setRounds] = useState<PracticeRoundType[]>([]);
  const [playTime, setPlayTime] = useState<number | undefined>();
  const [currentRoundNumber, setCurrentRoundNumber] = useState(0);
  const { data: words } = useWords();

  const generateRounds = ({
    words,
    maxRounds,
    numberOfCards,
  }: {
    words: PracticeWordType[];
    maxRounds?: number;
    numberOfCards?: number;
  }): PracticeRoundType[] => {
    const suffledWords = suffleArray(words);
    const rounds: PracticeRoundType[] = [];

    const _numberOfCards = numberOfCards ?? DEFAULT_NUMBER_OF_CARDS;

    while (suffledWords.length) {
      if (maxRounds && rounds.length === maxRounds) {
        break;
      }
      const initialWords = [];
      for (let i = 0; i < _numberOfCards; i++) {
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

  const handlePlay = ({
    tags,
    maxRounds,
    numberOfCards,
    playTime,
  }: PracticePlayConfig) => {
    const filteredWords = words
      .filter(({ word, translation, tags: wordTags }) => {
        return (
          wordTags?.some((wordTagId) => tags.includes(wordTagId)) &&
          word &&
          translation
        );
      })
      .map((w) => ({
        word: w.word as string,
        translation: w.translation as string,
      }));
    if (filteredWords.length === 0) {
      setState("error");
      return;
    }
    const generatedRounds = generateRounds({
      words: filteredWords,
      maxRounds,
      numberOfCards,
    });
    setPlayTime(playTime);
    setRounds(generatedRounds);
    setState("playing");
  };

  const startNextRound = () => {
    setCurrentRoundNumber(currentRoundNumber + 1);
  };

  const handleRestart = () => {
    setState("initial");
    setCurrentRoundNumber(0);
    setRounds([]);
  };

  const handleGoToResume = () => {
    setState("resume");
  };

  return (
    <PracticeContext.Provider
      value={{
        state,
        rounds,
        currentRound: rounds[currentRoundNumber],
        currentRoundNumber,
        percentageCompleted: rounds.length
          ? Math.round((100 * currentRoundNumber) / rounds.length)
          : 0,
        playTime,
        onPlay: handlePlay,
        goToResume: handleGoToResume,
        startNextRound,
        restart: handleRestart,
      }}
    >
      {children}
    </PracticeContext.Provider>
  );
};
