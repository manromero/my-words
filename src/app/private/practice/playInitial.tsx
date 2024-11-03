"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
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

  const handleClick = () => {
    const checkedIdTags = checkboxTags
      .filter((t) => t.checked)
      .map((t) => t.id as string);
    onPlay(checkedIdTags);
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      marginTop={2}
    >
      <Divider textAlign="center">
        <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
          Select some tags to practice
        </Typography>
      </Divider>
      <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
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
        variant="contained"
        startIcon={<PlayArrowIcon />}
        color="primary"
        type="button"
        sx={{ width: "100%", marginTop: 2 }}
        disabled={!checkboxTags.some((tag) => tag.checked)}
        onClick={handleClick}
      >
        Start
      </Button>
    </Stack>
  );
};
