"use client";

import { PlayCard } from "@/components";
import { usePractice } from "@/hooks";
import { PracticeCardType } from "@/types";
import { Box, Button, LinearProgress, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { GoToResumeModal } from "@/components/practice";

export const PlayBoard = () => {
  const {
    currentRound,
    percentageCompleted,
    startNextRound,
    restart,
    goToResume,
    playTime,
  } = usePractice();

  const [suffledWords, setSuffledWords] = useState<
    PracticeCardType[] | undefined
  >(currentRound?.suffledWords);
  const [suffledTranslations, setSuffledTranslations] = useState<
    PracticeCardType[] | undefined
  >(currentRound?.suffledTranslations);

  const [timeExpended, setTimeExpended] = useState(0);

  const [selectedWordId, setSelectedWordId] = useState<string>();
  const [selectedTranslationId, setSelectedTranslationId] = useState<string>();

  const [openModalTimeIsUp, setOpenModalTimeIsUp] = useState(false);
  const [openModalGameFinish, setOpenModalGameFinish] = useState(false);

  const wordErrorIds = useRef<string[]>([]);

  // Listen when new round
  React.useEffect(() => {
    // if !currentRound -> game finished
    if (currentRound === undefined) {
      clearInterval(timeExpendedInterval.current);
      setOpenModalGameFinish(true);
      return;
    }
    setSelectedWordId(undefined);
    setSelectedTranslationId(undefined);
    setSuffledWords([...currentRound.suffledWords]);
    setSuffledTranslations([...currentRound.suffledTranslations]);
  }, [currentRound]);

  // Initialice timer if set
  const timeExpendedInterval = useRef<NodeJS.Timeout | undefined>();
  React.useEffect(() => {
    timeExpendedInterval.current = setInterval(() => {
      setTimeExpended((prev) => prev + 1);
    }, 1000);
    return () => {
      clearInterval(timeExpendedInterval.current);
    };
  }, []);

  // Listen when time finish
  React.useEffect(() => {
    if (playTime && playTime === timeExpended) {
      clearInterval(timeExpendedInterval.current);
      setOpenModalTimeIsUp(true);
    }
  }, [timeExpended, playTime]);

  const checkMatch = ({
    wordId,
    translationId,
  }: {
    wordId: string;
    translationId: string;
  }) => {
    // Success
    if (wordId === translationId) {
      const _suffledWords = suffledWords?.map((suffledWord) => {
        if (suffledWord.id === wordId) {
          return { ...suffledWord, disabled: true };
        }
        return suffledWord;
      });
      const _suffledTranslations = suffledTranslations?.map(
        (suffledTranslation) => {
          if (suffledTranslation.id === translationId) {
            return { ...suffledTranslation, disabled: true };
          }
          return suffledTranslation;
        }
      );
      setSuffledWords(_suffledWords);
      setSuffledTranslations(_suffledTranslations);
      // If there are not more words to mark as checked
      if (!_suffledWords?.some((sw) => !sw.disabled)) {
        startNextRound();
      }
      return;
    }
    // Error
    wordErrorIds.current.push(wordId, translationId);
    // TODO MANROMERO add some animation
  };

  const handleWordClick = (word: PracticeCardType) => {
    const _selectedWordId = selectedWordId !== word.id ? word.id : undefined;
    if (_selectedWordId && selectedTranslationId) {
      setSelectedTranslationId(undefined);
      checkMatch({
        wordId: _selectedWordId,
        translationId: selectedTranslationId,
      });
    } else {
      setSelectedWordId(_selectedWordId);
    }
  };

  const handleTranslationClick = (translation: PracticeCardType) => {
    const _selectedTranslationId =
      selectedTranslationId !== translation.id ? translation.id : undefined;
    if (selectedWordId && _selectedTranslationId) {
      setSelectedWordId(undefined);
      checkMatch({
        wordId: selectedWordId,
        translationId: _selectedTranslationId,
      });
    } else {
      setSelectedTranslationId(_selectedTranslationId);
    }
  };

  const handleGoToResume = () => {
    const uniqueWordErrorIds = wordErrorIds.current.filter((element, index) => {
      return wordErrorIds.current.indexOf(element) === index;
    });
    goToResume({
      timeExpended,
      wordErrorIds: uniqueWordErrorIds,
    });
  };

  return (
    <>
      <Stack direction="column" gap={2} width={"100%"} marginTop={2}>
        {playTime && (
          <Stack
            sx={{ width: "100%" }}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Box sx={{ p: 2, border: "2px solid black" }}>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>{`${
                playTime - timeExpended
              } sec`}</Typography>
            </Box>
          </Stack>
        )}
        <Stack
          sx={{ width: "100%" }}
          direction="row"
          alignItems="center"
          gap={1}
        >
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
          {suffledWords?.map((suffledWord, index) => {
            const suffledTranslation = suffledTranslations?.[
              index
            ] as PracticeCardType;
            return (
              <Stack direction="row" gap={2} key={suffledWord.id}>
                <PlayCard
                  label={suffledWord.value}
                  selected={suffledWord.id === selectedWordId}
                  disabled={suffledWord.disabled}
                  onClick={() => handleWordClick(suffledWord)}
                />
                <PlayCard
                  label={suffledTranslation.value}
                  disabled={suffledTranslation.disabled}
                  selected={suffledTranslation.id === selectedTranslationId}
                  onClick={() => handleTranslationClick(suffledTranslation)}
                />
              </Stack>
            );
          })}
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
      <GoToResumeModal
        open={openModalTimeIsUp}
        title="Time is up!"
        onGoToResume={handleGoToResume}
      />
      <GoToResumeModal
        open={openModalGameFinish}
        title="Game Finished!"
        onGoToResume={handleGoToResume}
      />
    </>
  );
};
