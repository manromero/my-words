"use client";

import { MOCK_TAGS } from "@/mock";
import React, { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";

import Collapse from "@mui/material/Collapse";
import {
  Box,
  Checkbox,
  Chip,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { WordList, WordModalForm } from "@/components";
import { useData, useWordsFilter } from "@/hooks";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { WordType } from "@/types";

export default function MainPage() {
  const [filterExpanded, setFilterExpanded] = React.useState(false);
  const { words, tags } = useData();
  const [modalWord, setModalWord] = useState<WordType | undefined>(undefined);

  const {
    onChangeSearchText,
    onChangeCheckboxTag,
    wordsFiltered,
    checkboxTags,
  } = useWordsFilter({
    words: words.data,
    tags: tags.data,
  });

  const handleFilterClick = () => {
    setFilterExpanded(!filterExpanded);
  };

  const handleCreateWordClick = () => {
    setModalWord({ word: "", translation: "", notes: "", tags: [] });
  };

  const handleWordClick = (word: WordType) => {
    setModalWord({ ...word });
  };

  const handleCloseModalForm = () => {
    setModalWord(undefined);
  };

  const handleDelete = () => {
    setModalWord(undefined);
  };

  const handleCreate = () => {
    setModalWord(undefined);
  };

  const handleEdit = () => {
    setModalWord(undefined);
  };

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="input-filter-words">
            Filter word or concept
          </InputLabel>
          <OutlinedInput
            fullWidth
            label="Filter word or concept"
            id="input-filter-words"
            onChange={onChangeSearchText}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  color="primary"
                  aria-label="Click here to autogenerate a translation"
                  onClick={handleFilterClick}
                >
                  <SettingsIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <IconButton
          color="primary"
          aria-label="Create a new word"
          onClick={handleCreateWordClick}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Stack>
      <Collapse in={filterExpanded}>
        <Container
          maxWidth={false}
          sx={{
            width: "100%",
            marginTop: 1,
            padding: 2,
            borderRadius: 1,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "primary.light",
          }}
        >
          <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
            {checkboxTags.map((tag) => (
              <FormControlLabel
                key={tag.id}
                control={
                  <Checkbox value={tag.id} onChange={onChangeCheckboxTag} />
                }
                label={<Chip label={tag.label} color={tag.color as any} />}
              />
            ))}
          </FormGroup>
        </Container>
      </Collapse>
      <WordList
        tags={tags.data}
        words={wordsFiltered}
        loading={words.loading}
        error={words.error}
        onWordClick={handleWordClick}
      />
      <WordModalForm
        word={modalWord}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onClose={handleCloseModalForm}
        onDelete={handleDelete}
      />
    </Box>
  );
}
