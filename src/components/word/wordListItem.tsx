import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import React from "react";
import { TagType, WordType } from "@/types";
import { Chip, Stack } from "@mui/material";

type WordListItemType = {
  tags: TagType[];
  word: WordType;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export const WordListItem = (props: WordListItemType) => {
  const listItemContent = (
    <React.Fragment>
      <ListItemText
        primary={props.word.word}
        secondary={props.word.translation}
      />
      <Stack direction="row" gap={1} flexWrap="wrap">
        {props.tags
          .filter((tag) => props.word.tags?.includes(tag.id as string))
          .map((tag) => (
            <Chip
              key={tag.id}
              label={tag.label}
              color={tag.color as any}
              component={"span"}
            />
          ))}
      </Stack>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Divider variant="fullWidth" component="li" />
      <ListItem
        sx={
          props.onClick
            ? { padding: 0 }
            : {
                flexDirection: "column",
                alignItems: "flex-start",
              }
        }
      >
        {props.onClick ? (
          <ListItemButton
            onClick={props.onClick}
            sx={{
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {listItemContent}
          </ListItemButton>
        ) : (
          listItemContent
        )}
      </ListItem>
    </React.Fragment>
  );
};
