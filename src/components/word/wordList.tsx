import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import React from "react";
import { TagType, WordType } from "@/types";
import { Box, Chip, Stack } from "@mui/material";

type WordListType = {
  tags: TagType[];
  words: WordType[];
  loading: boolean;
  error: boolean;
  onWordClick?: (word: WordType) => void;
};

export const WordList = (props: WordListType) => {
  return (
    <List>
      {props.words.map((word) => (
        <React.Fragment key={word.id}>
          <Divider variant="fullWidth" component="li" />
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => props.onWordClick?.(word)}
              sx={{
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <ListItemText primary={word.word} secondary={word.translation} />
              <Stack direction="row" gap={1} flexWrap="wrap">
                {props.tags
                  .filter((tag) => word.tags?.includes(tag.id as string))
                  .map((tag) => (
                    <Chip
                      key={tag.id}
                      label={tag.label}
                      color={tag.color as any}
                      component={"span"}
                    />
                  ))}
              </Stack>
            </ListItemButton>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
};
