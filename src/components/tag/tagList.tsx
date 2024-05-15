import { MOCK_TAGS } from "@/mock";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import React from "react";
import { Chip } from "@mui/material";

export const TagList = () => {
  return (
    <List>
      {MOCK_TAGS.map((tag) => (
        <React.Fragment key={tag.label}>
          <Divider variant="fullWidth" component="li" />
          <ListItem disablePadding>
            <ListItemButton>
              <Chip label={tag.label} color={tag.color as any} />
            </ListItemButton>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
};
