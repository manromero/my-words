"use client";

import React, { useState } from "react";

import { PracticeContext } from "./PracticeContext";

import {
  PracticeGoToResumeType,
  PracticePlayConfigType,
  PracticeResumeType,
  PracticeRoundStateType,
  PracticeRoundType,
  WordType,
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
    wordsError: [],
    wordsSuccess: [],
  });
  const { data: words } = useWords();

  const generateRounds = ({
    words,
    maxRounds,
    numberOfCards,
  }: {
    words: WordType[];
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
      const initialWords: WordType[] = [];
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
            // Already checked word and translation exists
            id: w.id as string,
            value: w.word as string,
            disabled: false,
          }))
        ),
        suffledTranslations: suffleArray(
          initialWords.map((w) => ({
            id: w.id as string,
            value: w.translation as string,
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
    const filteredWords = words.filter(
      ({ word, translation, tags: wordTags }) => {
        return (
          wordTags?.some((wordTagId) => tags.includes(wordTagId)) &&
          word &&
          translation
        );
      }
    );
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
    const words = rounds.reduce(
      (acc, round) => acc.concat(round.initialWords),
      [] as WordType[]
    );
    const wordsLength = words.length;
    const accuracy = Math.round((100.0 * wordErrorIds.length) / wordsLength);
    const wordsError: WordType[] = [];
    const wordsSuccess: WordType[] = [];
    for (const word of words) {
      if (wordErrorIds.includes(word.id as string)) {
        wordsError.push(word);
      } else {
        wordsSuccess.push(word);
      }
    }

    setResume({
      timeExpended,
      wordsLength,
      accuracy,
      wordsError,
      wordsSuccess,
    });
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
