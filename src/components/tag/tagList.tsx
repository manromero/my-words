import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import React from "react";
import { Chip } from "@mui/material";
import { TagType } from "@/types";
import { TagListSkeleton } from "./tagListSkeleton";

type TagListType = {
  tags: TagType[];
  loading: boolean;
  onTagClick?: (word: TagType) => void;
};

export const TagList = (props: TagListType) => {
  if (props.loading) {
    return <TagListSkeleton />;
  }

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
