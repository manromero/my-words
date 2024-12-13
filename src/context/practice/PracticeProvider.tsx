"use client";

import React, { useState } from "react";

import { PracticeContext } from "./PracticeContext";

import {
  PracticeGoToResumeType,
  PracticePlayConfigType,
  PracticeResumeType,
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
  const [currentRoundNumber, setCurrentRoundNumber] = useState(0);
  const [playTime, setPlayTime] = useState<number | undefined>();
  const [resume, setResume] = useState<PracticeResumeType>({
    wordsLength: 0,
    timeExpended: 0,
    accuracy: 0,
  });
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
      const initialWords: PracticeWordType[] = [];
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
            id: w.id,
            value: w.word,
            disabled: false,
          }))
        ),
        suffledTranslations: suffleArray(
          initialWords.map((w) => ({
            id: w.id,
            value: w.translation,
            disabled: false,
          }))
        ),
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
  }: PracticePlayConfigType) => {
    const filteredWords = words
      .filter(({ word, translation, tags: wordTags }) => {
        return (
          wordTags?.some((wordTagId) => tags.includes(wordTagId)) &&
          word &&
          translation
        );
      })
      .map((w) => ({
        id: w.id as string,
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
    setRounds([]);
    setCurrentRoundNumber(0);
    setPlayTime(undefined);
  };

  const handleGoToResume = ({
    timeExpended,
    wordErrorIds,
  }: PracticeGoToResumeType) => {
    const wordsLength = rounds.reduce(
      (acc, round) => acc + round.initialWords.length,
      0
    );
    const accuracy = Math.round((100.0 * wordErrorIds.length) / wordsLength);
    setResume({ ...resume, timeExpended, wordsLength, accuracy });
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
        resume,
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
