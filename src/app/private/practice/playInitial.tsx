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
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { useData, usePractice } from "@/hooks";
import { TagType } from "@/types";

type InnerTagType = TagType & {
  checked?: boolean;
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

  const handleChangeCheckboxTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTags = checkboxTags.map((tag) => {
      return {
        ...tag,
        checked: tag.id === e.target.value ? e.target.checked : tag.checked,
      };
    });
    setCheckboxTags(newTags);
  };

  const handleAddConfigClick = () => {
    setShowMoreConfig((prev) => !prev);
  };

  const handlePlayClick = () => {
    const checkedIdTags = checkboxTags
      .filter((t) => t.checked)
      .map((t) => t.id as string);
    onPlay(checkedIdTags);
  };

  return (
    <Stack direction="column" justifyContent="center" gap={1} marginTop={2}>
      <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
        Select some tags to practice
      </Typography>
      <FormGroup
        sx={{ display: "flex", flexDirection: "row", alignSelf: "center" }}
      >
        {checkboxTags.map((tag) => (
          <FormControlLabel
            key={tag.id}
            control={
              <Checkbox value={tag.id} onChange={handleChangeCheckboxTag} />
            }
            label={<Chip label={tag.label} color={tag.color as any} />}
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
            />
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <TextField
              fullWidth
              name="maxRounds"
              label="Max. Number of Rounds"
              variant="outlined"
              type="number"
            />
          </FormControl>
        </Stack>
      </Collapse>
      <Button
        variant="contained"
        startIcon={<PlayArrowIcon />}
        color="primary"
        type="button"
        sx={{ width: "100%" }}
        disabled={!checkboxTags.some((tag) => tag.checked)}
        onClick={handlePlayClick}
      >
        Start
      </Button>
    </Stack>
  );
};
