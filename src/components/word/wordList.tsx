import List from "@mui/material/List";

import React from "react";
import { TagType, WordType } from "@/types";

import { WordListSkeleton } from "./wordListSkeleton";
import { WordListItem } from "./wordListItem";

type WordListType = {
  tags: TagType[];
  words: WordType[];
  loading?: boolean;
  // TODO MANROMERO add error message
  error?: boolean;
  onWordClick?: (word: WordType) => void;
};

export const WordList = (props: WordListType) => {
  if (props.loading) {
    return <WordListSkeleton />;
  }

  return (
    <List>
      {props.words.map((word) => (
        <WordListItem
          key={word.id}
          word={word}
          tags={props.tags}
          onClick={
            props.onWordClick ? () => props.onWordClick?.(word) : undefined
          }
        />
      ))}
    </List>
  );
};
