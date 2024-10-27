"use client";

import { PlayCard } from "@/components";
import { Stack } from "@mui/material";
import React, { useState } from "react";

const game = {
  words: [
    {
      word: "Cat",
      translation: "Gato",
    },
    {
      word: "Home",
      translation: "Casa",
    },
    {
      word: "Dog",
      translation: "Perro",
    },
    {
      word: "Computer",
      translation: "Ordenador",
    },
    {
      word: "Girl",
      translation: "Niña",
    },
  ],
};

type SuffledCardType = {
  value: string;
  disabled: boolean;
};

const suffleArray = (array: string[]) => {
  return array.sort((_a, _b) => 0.5 - Math.random());
};

const getSuffledWords = () => {
  return suffleArray(game.words.map((word) => word.word)).map((word) => ({
    value: word,
    disabled: false,
  }));
};

const getSuffledTranslations = () => {
  return suffleArray(game.words.map((word) => word.translation)).map(
    (translation) => ({
      value: translation,
      disabled: false,
    })
  );
};

export const PlayBoard = () => {
  const [suffledWords, setSuffledWords] = useState<SuffledCardType[]>(
    getSuffledWords()
  );
  const [suffledTranslations, setSuffledTranslations] = useState<
    SuffledCardType[]
  >(getSuffledTranslations());

  const [selectedWord, setSelectedWord] = useState<string>();
  const [selectedTranslation, setSelectedTranslation] = useState<string>();

  const checkMatch = ({
    word,
    translation,
  }: {
    word: string;
    translation: string;
  }) => {
    const originalWordTranslation = game.words.find(
      (gameWord) => gameWord.word === word
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

  const handleWordClick = (word: SuffledCardType) => {
    const _selectedWord = selectedWord !== word.value ? word.value : undefined;
    if (_selectedWord && selectedTranslation) {
      setSelectedTranslation(undefined);
      checkMatch({ word: _selectedWord, translation: selectedTranslation });
    } else {
      setSelectedWord(_selectedWord);
    }
  };

  const handleTranslationClick = (translation: SuffledCardType) => {
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
