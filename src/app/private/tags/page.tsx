"use client";

import { TagList } from "@/components";
import { TagModalForm } from "@/components/tag/tagModalForm";
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
      <Stack direction="row" spacing={2}>
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
      <TagList tags={tagsFiltered} onTagClick={handleTagClick} />
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
