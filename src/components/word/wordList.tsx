import { MOCK_WORDS } from "@/mock";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import React from "react";
import { WordType } from "@/types";

type WordListType = {
  words: WordType[];
  loading: boolean;
  error: boolean;
};

export const WordList = (props: WordListType) => {
  return (
    <List>
      {props.words.map((word) => (
        <React.Fragment key={word.id}>
          <Divider variant="fullWidth" component="li" />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={word.word} secondary={word.translation} />
            </ListItemButton>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
};
