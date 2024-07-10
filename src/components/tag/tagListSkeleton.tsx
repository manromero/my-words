import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import React from "react";
import { Skeleton } from "@mui/material";

type TagListSkeletonType = {};

export const TagListSkeleton = (props: TagListSkeletonType) => {
  return (
    <List>
      <TagListSkeletonGroup />
      <TagListSkeletonGroup />
      <TagListSkeletonGroup />
      <TagListSkeletonGroup />
    </List>
  );
};

const TagListSkeletonGroup = () => (
  <React.Fragment>
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
  </React.Fragment>
);
