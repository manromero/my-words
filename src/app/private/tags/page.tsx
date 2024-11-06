"use client";

import { TagList, TagModalForm } from "@/components";
import { useData, useTagsFilter } from "@/hooks";
import { TagType } from "@/types";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function TagListPage() {
  const { tags } = useData();

  const [modalTag, setModalTag] = useState<TagType | undefined>(undefined);

  const { onChangeSearchText, tagsFiltered } = useTagsFilter({
    tags: tags.data,
  });

  const handleCreateTagClick = () => {
    setModalTag({ label: "", color: "default" });
  };

  const handleTagClick = (tag: TagType) => {
    setModalTag({ ...tag });
  };

  const handleCloseModalForm = () => {
    setModalTag(undefined);
  };

  const handleDelete = () => {
    setModalTag(undefined);
  };

  const handleCreate = () => {
    setModalTag(undefined);
  };

  const handleEdit = () => {
    setModalTag(undefined);
  };

  return (
    <Box>
      <Stack
        direction="row"
        gap={2}
        sx={{
          position: "sticky",
          top: { xs: "56px", sm: "64px" },
          paddingTop: 2,
          // TODO MANROMERO color
          background: "white",
          zIndex: 1,
        }}
      >
        <FormControl variant="outlined" fullWidth>
          <InputLabel htmlFor="input-filter-tags">Filter tags</InputLabel>
          <OutlinedInput
            fullWidth
            label="Filter tags"
            id="input-filter-tags"
            onChange={onChangeSearchText}
          />
        </FormControl>
        <IconButton
          color="primary"
          aria-label="Create a new tag"
          onClick={handleCreateTagClick}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Stack>
      <TagList
        tags={tagsFiltered}
        onTagClick={handleTagClick}
        loading={tags.loading}
      />
      <TagModalForm
        tag={modalTag}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onClose={handleCloseModalForm}
      />
    </Box>
  );
}
