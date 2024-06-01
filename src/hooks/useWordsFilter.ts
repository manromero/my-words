import { TagType, WordType } from "@/types";
import { useEffect, useState } from "react";

type UseWordsFilterParams = {
  words: WordType[];
  tags: TagType[];
};

type InnerTagType = TagType & {
  checked?: boolean;
};

type UseWordsFilterResponse = {
  wordsFiltered: WordType[];
  checkboxTags: InnerTagType[];
  searchText: string;
  onChangeSearchText: React.ChangeEventHandler;
  onChangeCheckboxTag: React.ChangeEventHandler;
};

export const useWordsFilter = (
  props: UseWordsFilterParams
): UseWordsFilterResponse => {
  const [searchText, setSearchText] = useState<string>("");
  const [checkboxTags, setCheckboxTags] = useState<InnerTagType[]>(props.tags);

  useEffect(() => {
    setCheckboxTags((innerTags) => {
      const newTags = props.tags.map((tag) => ({
        ...tag,
        checked: innerTags.find((innerTag) => innerTag.id === tag.id)?.checked,
      }));
      return newTags;
    });
  }, [props.tags]);

  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleChangeCheckboxTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTags = checkboxTags.map((tag) => {
      return {
        ...tag,
        checked: tag.id === e.target.value ? e.target.checked : tag.checked,
      };
    });
    setCheckboxTags(newTags);
  };

  const searchFilteredLowerCase = searchText.toLowerCase();
  const filteredTags = checkboxTags
    .filter((tag) => tag.checked)
    .map((tag) => tag.id);
  const wordsFiltered = props.words.filter(
    ({ word, translation, notes, tags }) => {
      // Filter by tag
      if (
        filteredTags.length > 0 &&
        !tags?.some((wordTagId) => filteredTags.includes(wordTagId))
      ) {
        return false;
      }
      // Filter by search text
      return (
        word?.toLowerCase()?.includes(searchFilteredLowerCase) ||
        translation?.toLowerCase()?.includes(searchFilteredLowerCase) ||
        notes?.toLowerCase()?.includes(searchFilteredLowerCase)
      );
    }
  );

  return {
    wordsFiltered,
    checkboxTags,
    searchText,
    onChangeSearchText: handleChangeSearchText,
    onChangeCheckboxTag: handleChangeCheckboxTag,
  };
};
