import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import React from "react";
import { Skeleton, Stack } from "@mui/material";

type WordListSkeletonType = {};

export const WordListSkeleton = (props: WordListSkeletonType) => {
  return (
    <List>
      <WordListSkeletonGroup />
      <WordListSkeletonGroup />
      <WordListSkeletonGroup />
      <WordListSkeletonGroup />
    </List>
  );
};

const WordListSkeletonGroup = () => (
  <React.Fragment>
    <React.Fragment>
      <Divider variant="fullWidth" component="li" />
      <ListItem disablePadding>
        <ListItemButton
          sx={{
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <ListItemText
            primary={<Skeleton variant="rounded" width={150} height={24} />}
            secondary={
              <Skeleton
                variant="rounded"
                width={200}
                height={20}
                sx={{ marginTop: 1 }}
              />
            }
          />
          <Stack direction="row" gap={1} flexWrap="wrap">
            <Skeleton variant="rounded" width={70} height={32} />
          </Stack>
        </ListItemButton>
      </ListItem>
    </React.Fragment>
    <React.Fragment>
      <Divider variant="fullWidth" component="li" />
      <ListItem disablePadding>
        <ListItemButton
          sx={{
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <ListItemText
            primary={<Skeleton variant="rounded" width={90} height={24} />}
            secondary={
              <Skeleton
                variant="rounded"
                width={100}
                height={20}
                sx={{ marginTop: 1 }}
              />
            }
          />
          <Stack direction="row" gap={1} flexWrap="wrap">
            <Skeleton variant="rounded" width={80} height={32} />
            <Skeleton variant="rounded" width={70} height={32} />
          </Stack>
        </ListItemButton>
      </ListItem>
    </React.Fragment>
    <React.Fragment>
      <Divider variant="fullWidth" component="li" />
      <ListItem disablePadding>
        <ListItemButton
          sx={{
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <ListItemText
            primary={<Skeleton variant="rounded" width={120} height={24} />}
            secondary={
              <Skeleton
                variant="rounded"
                width={160}
                height={20}
                sx={{ marginTop: 1 }}
              />
            }
          />
          <Stack direction="row" gap={1} flexWrap="wrap">
            <Skeleton variant="rounded" width={70} height={32} />
            <Skeleton variant="rounded" width={60} height={32} />
            <Skeleton variant="rounded" width={80} height={32} />
          </Stack>
        </ListItemButton>
      </ListItem>
    </React.Fragment>
    <React.Fragment>
      <Divider variant="fullWidth" component="li" />
      <ListItem disablePadding>
        <ListItemButton
          sx={{
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <ListItemText
            primary={<Skeleton variant="rounded" width={120} height={24} />}
            secondary={
              <Skeleton
                variant="rounded"
                width={160}
                height={20}
                sx={{ marginTop: 1 }}
              />
            }
          />
          <Stack direction="row" gap={1} flexWrap="wrap">
            <Skeleton variant="rounded" width={80} height={32} />
            <Skeleton variant="rounded" width={70} height={32} />
          </Stack>
        </ListItemButton>
      </ListItem>
    </React.Fragment>
  </React.Fragment>
);
