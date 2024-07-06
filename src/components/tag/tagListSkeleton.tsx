import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import React from "react";
import { Chip, Skeleton } from "@mui/material";
import { TagType } from "@/types";

type TagListSkeletonType = {};

export const TagListSkeleton = (props: TagListSkeletonType) => {
  return (
    <List>
      <React.Fragment>
        <Divider variant="fullWidth" component="li" />
        <ListItem disablePadding>
          <ListItemButton>
            <Skeleton variant="rounded" width={130} height={32} />
          </ListItemButton>
        </ListItem>
      </React.Fragment>
      <React.Fragment>
        <Divider variant="fullWidth" component="li" />
        <ListItem disablePadding>
          <ListItemButton>
            <Skeleton variant="rounded" width={220} height={32} />
          </ListItemButton>
        </ListItem>
      </React.Fragment>
      <React.Fragment>
        <Divider variant="fullWidth" component="li" />
        <ListItem disablePadding>
          <ListItemButton>
            <Skeleton variant="rounded" width={100} height={32} />
          </ListItemButton>
        </ListItem>
      </React.Fragment>
      <React.Fragment>
        <Divider variant="fullWidth" component="li" />
        <ListItem disablePadding>
          <ListItemButton>
            <Skeleton variant="rounded" width={150} height={32} />
          </ListItemButton>
        </ListItem>
      </React.Fragment>
    </List>
  );
};
