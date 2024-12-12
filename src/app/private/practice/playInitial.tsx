"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { useData, usePractice } from "@/hooks";
import { PracticePlayConfigType, TagType } from "@/types";

type InnerTagType = TagType & {
  checked?: boolean;
};

const defaultConfig: PracticePlayConfigType = {
  tags: [],
  numberOfCards: undefined,
  maxRounds: undefined,
  playTime: undefined,
};

export const PlayInitial = () => {
  const { onPlay } = usePractice();

  const { tags } = useData();

  const [checkboxTags, setCheckboxTags] = useState<InnerTagType[]>([]);
  const [showMoreConfig, setShowMoreConfig] = useState(false);

  useEffect(() => {
    setCheckboxTags((innerTags) => {
      const newTags = tags.data.map((tag) => ({
        ...tag,
        checked: innerTags.find((innerTag) => innerTag.id === tag.id)?.checked,
      }));
      return newTags;
    });
  }, [tags.data]);

  const handleAddConfigClick = () => {
    setShowMoreConfig((prev) => !prev);
  };

  return (
    <Formik
      initialValues={defaultConfig}
      validationSchema={Yup.object({
        numberOfCards: Yup.number()
          .min(2, "Should be greater than 2")
          .max(10, "Should be less than 10"),
        maxRounds: Yup.number().min(1, "Should be greater than 1"),
        playTime: Yup.number()
          .min(1, "Should be greater than 1")
          .max(3600, "Should be less than 3600"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        console.log("values", values);
        setSubmitting(true);
        onPlay(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        isSubmitting,
      }) => {
        const numberOfCardsError = Boolean(
          errors.numberOfCards && touched.numberOfCards
        );
        const maxRoundsError = Boolean(errors.maxRounds && touched.maxRounds);
        const playTimeError = Boolean(errors.playTime && touched.playTime);

        return (
          <Stack
            component="form"
            direction="column"
            justifyContent="center"
            gap={1}
            marginTop={2}
            onSubmit={handleSubmit}
          >
            <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
              Select some tags to practice
            </Typography>
            <FormGroup
              sx={{
                display: "flex",
                flexDirection: "row",
                alignSelf: "center",
              }}
            >
              {checkboxTags.map((tag) => (
                <FormControlLabel
                  key={tag.id}
                  control={<Checkbox />}
                  label={<Chip label={tag.label} color={tag.color as any} />}
                  name="tags"
                  value={tag.id}
                  onChange={handleChange}
                  checked={values.tags?.includes(tag.id as string)}
                />
              ))}
            </FormGroup>
            <Button
              variant="outlined"
              color="primary"
              type="button"
              sx={{ width: "100%" }}
              onClick={handleAddConfigClick}
            >
              {showMoreConfig ? "Contract More Config" : "Expand More Config"}
            </Button>
            <Collapse in={showMoreConfig}>
              <Stack direction={{ xs: "column", lg: "row" }} gap={1}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <TextField
                    fullWidth
                    name="numberOfCards"
                    label="Number of cards"
                    variant="outlined"
                    type="number"
                    helperText={
                      numberOfCardsError ? errors.numberOfCards : undefined
                    }
                    error={numberOfCardsError}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <TextField
                    fullWidth
                    name="maxRounds"
                    label="Max. Number of Rounds"
                    variant="outlined"
                    type="number"
                    helperText={maxRoundsError ? errors.maxRounds : undefined}
                    error={maxRoundsError}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <TextField
                    fullWidth
                    name="playTime"
                    label="Play Time (seconds)"
                    variant="outlined"
                    type="number"
                    helperText={playTimeError ? errors.playTime : undefined}
                    error={playTimeError}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl>
              </Stack>
            </Collapse>
            <Button
              variant="contained"
              startIcon={<PlayArrowIcon />}
              color="primary"
              type="submit"
              sx={{ width: "100%" }}
              disabled={
                Object.values(errors).some((e) => e) ||
                isSubmitting ||
                values.tags.length === 0
              }
            >
              Start
            </Button>
          </Stack>
        );
      }}
    </Formik>
  );
};
