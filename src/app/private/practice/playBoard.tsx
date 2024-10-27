"use client";

import { PlayCard } from "@/components";
import { usePractice } from "@/hooks";
import { PracticeCardType } from "@/types";
import { Stack } from "@mui/material";
import React, { useState } from "react";

export const PlayBoard = () => {
  const { currentRound } = usePractice();

  const [suffledWords, setSuffledWords] = useState<PracticeCardType[]>(
    currentRound.suffledWords
  );
  const [suffledTranslations, setSuffledTranslations] = useState<
    PracticeCardType[]
  >(currentRound.suffledTranslations);

  const [selectedWord, setSelectedWord] = useState<string>();
  const [selectedTranslation, setSelectedTranslation] = useState<string>();

  const checkMatch = ({
    word,
    translation,
  }: {
    word: string;
    translation: string;
  }) => {
    const originalWordTranslation = currentRound.initialWords.find(
      (initialWord) => initialWord.word === word
    );

    // Success
    if (translation === originalWordTranslation?.translation) {
      const _suffledWords = suffledWords.map((suffledWord) => {
        if (suffledWord.value === word) {
          return { ...suffledWord, disabled: true };
        }
        return suffledWord;
      });
      const _suffledTranslations = suffledTranslations.map(
        (suffledTranslation) => {
          if (suffledTranslation.value === translation) {
            return { ...suffledTranslation, disabled: true };
          }
          return suffledTranslation;
        }
      );
      setSuffledWords(_suffledWords);
      setSuffledTranslations(_suffledTranslations);
      return;
    }
    // Error
    // TODO MANROMERO
  };

  const handleWordClick = (word: PracticeCardType) => {
    const _selectedWord = selectedWord !== word.value ? word.value : undefined;
    if (_selectedWord && selectedTranslation) {
      setSelectedTranslation(undefined);
      checkMatch({ word: _selectedWord, translation: selectedTranslation });
    } else {
      setSelectedWord(_selectedWord);
    }
  };

  const handleTranslationClick = (translation: PracticeCardType) => {
    const _selectedTranslation =
      selectedTranslation !== translation.value ? translation.value : undefined;
    if (selectedWord && _selectedTranslation) {
      setSelectedWord(undefined);
      checkMatch({ word: selectedWord, translation: _selectedTranslation });
    } else {
      setSelectedTranslation(_selectedTranslation);
    }
  };

  return (
    <Stack direction="column" spacing={2} width={"100%"} marginTop={4}>
      {suffledWords.map((suffledWord, index) => (
        <Stack direction="row" spacing={2} key={suffledWord.value}>
          <PlayCard
            label={suffledWord.value}
            selected={suffledWord.value === selectedWord}
            disabled={suffledWord.disabled}
            onClick={() => handleWordClick(suffledWord)}
          />
          <PlayCard
            label={suffledTranslations[index].value}
            disabled={suffledTranslations[index].disabled}
            selected={suffledTranslations[index].value === selectedTranslation}
            onClick={() => handleTranslationClick(suffledTranslations[index])}
          />
        </Stack>
      ))}
    </Stack>
  );
};
