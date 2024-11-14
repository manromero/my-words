"use client";

import { PlayCard } from "@/components";
import { usePractice } from "@/hooks";
import { PracticeCardType } from "@/types";
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export const PlayBoard = () => {
  const {
    currentRound,
    percentageCompleted,
    startNextRound,
    restart,
    playTime,
  } = usePractice();

  const [suffledWords, setSuffledWords] = useState<PracticeCardType[]>(
    currentRound.suffledWords
  );
  const [suffledTranslations, setSuffledTranslations] = useState<
    PracticeCardType[]
  >(currentRound.suffledTranslations);
  const [timeToFinish, setTimeToFinish] = useState<number | undefined>();

  const [selectedWord, setSelectedWord] = useState<string>();
  const [selectedTranslation, setSelectedTranslation] = useState<string>();

  // Listen when new round
  React.useEffect(() => {
    setSelectedWord(undefined);
    setSelectedWord(undefined);
    setSuffledWords([...currentRound.suffledWords]);
    setSuffledTranslations([...currentRound.suffledTranslations]);
    let interval: NodeJS.Timeout | undefined;
    if (playTime) {
      setTimeToFinish(playTime);
      interval = setInterval(
        () =>
          setTimeToFinish((_timeToFinish) =>
            _timeToFinish ? _timeToFinish - 1 : undefined
          ),
        1000
      );
    }
    return () => clearInterval(interval);
  }, [currentRound, playTime]);

  // Listen when time finish
  React.useEffect(() => {
    if (timeToFinish === 0) {
      // TODO MANROMERO IMPROVE!!
      window.alert("times up");
      restart();
    }
  }, [timeToFinish, restart]);

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
      // If there are not more words to mark as checked
      if (!_suffledWords.some((sw) => !sw.disabled)) {
        startNextRound();
      }
      return;
    }
    // Error
    // TODO MANROMERO add some animation
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
    <Stack direction="column" gap={2} width={"100%"} marginTop={2}>
      {timeToFinish !== undefined && (
        <Stack
          sx={{ width: "100%" }}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ p: 2, border: "2px solid black" }}>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary" }}
            >{`${timeToFinish} sec`}</Typography>
          </Box>
        </Stack>
      )}
      <Stack sx={{ width: "100%" }} direction="row" alignItems="center" gap={1}>
        <LinearProgress
          variant="determinate"
          value={percentageCompleted}
          sx={{ height: 8, borderRadius: 5, flexGrow: 1 }}
        />
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
        >{`${percentageCompleted}%`}</Typography>
      </Stack>
      <Stack direction="column" gap={2} width={"100%"}>
        {suffledWords.map((suffledWord, index) => (
          <Stack direction="row" gap={2} key={suffledWord.value}>
            <PlayCard
              label={suffledWord.value}
              selected={suffledWord.value === selectedWord}
              disabled={suffledWord.disabled}
              onClick={() => handleWordClick(suffledWord)}
            />
            <PlayCard
              label={suffledTranslations[index].value}
              disabled={suffledTranslations[index].disabled}
              selected={
                suffledTranslations[index].value === selectedTranslation
              }
              onClick={() => handleTranslationClick(suffledTranslations[index])}
            />
          </Stack>
        ))}
      </Stack>
      <Button
        variant="contained"
        size="large"
        color="error"
        startIcon={<RestartAltIcon />}
        onClick={restart}
        sx={{ marginTop: 5 }}
      >
        Restart
      </Button>
    </Stack>
  );
};
