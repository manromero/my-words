"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { useData } from "@/hooks";
import { TagType } from "@/types";

type InnerTagType = TagType & {
  checked?: boolean;
};

export const PlayInitial = () => {
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

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      marginTop={1}
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
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button
          variant="contained"
          startIcon={<PlayArrowIcon />}
          color="primary"
          type="button"
          disabled={!checkboxTags.some((tag) => tag.checked)}
        >
          Start
        </Button>
      </Stack>
    </Stack>
  );
};
