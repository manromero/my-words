import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import React from "react";
import { Chip } from "@mui/material";
import { TagType } from "@/types";

type TagListType = {
  tags: TagType[];
  onTagClick?: (word: TagType) => void;
};

export const TagList = (props: TagListType) => {
  return (
    <List>
      {props.tags.map((tag) => (
        <React.Fragment key={tag.id}>
          <Divider variant="fullWidth" component="li" />
          <ListItem disablePadding>
            <ListItemButton onClick={() => props.onTagClick?.(tag)}>
              <Chip label={tag.label} color={tag.color as any} />
            </ListItemButton>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
};
