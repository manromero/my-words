"use client";

import { MOCK_TAGS } from "@/mock";
import React from "react";
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
} from "@mui/material";
import { WordList } from "@/components";
import { useData, useWordsFilter } from "@/hooks";

export default function MainPage() {
  const [filterExpanded, setFilterExpanded] = React.useState(false);
  const { words, tags } = useData();
  const { onChangeSearchText, wordsFiltered } = useWordsFilter({
    words: words.data,
  });

  const handleFilterClick = () => {
    setFilterExpanded(!filterExpanded);
  };

  return (
    <Box>
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
            {tags.data.map((tag) => (
              <FormControlLabel
                key={tag.label}
                control={<Checkbox />}
                label={<Chip label={tag.label} color={tag.color as any} />}
              />
            ))}
          </FormGroup>
        </Container>
      </Collapse>
      <WordList
        words={wordsFiltered}
        loading={words.loading}
        error={words.error}
      />
    </Box>
  );
}
