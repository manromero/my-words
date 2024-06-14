import { TagType } from "@/types";
import { useState } from "react";

type UseTagsFilterParams = {
  tags: TagType[];
};

type UseWordsFilterResponse = {
  tagsFiltered: TagType[];
  searchText: string;
  onChangeSearchText: React.ChangeEventHandler;
};

export const useTagsFilter = (
  props: UseTagsFilterParams
): UseWordsFilterResponse => {
  const [searchText, setSearchText] = useState<string>("");

  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const searchFilteredLowerCase = searchText.toLowerCase();
  const tagsFiltered = props.tags.filter(({ label }) => {
    // Filter by search text
    return label?.toLowerCase()?.includes(searchFilteredLowerCase);
  });

  return {
    tagsFiltered,
    searchText,
    onChangeSearchText: handleChangeSearchText,
  };
};
