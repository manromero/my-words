import { WordType } from "@/types";
import { useState } from "react";

type UseWordsFilterParams = {
  words: WordType[];
};

type UseWordsFilterResponse = {
  wordsFiltered: WordType[];
  searchText: string;
  onChangeSearchText: React.ChangeEventHandler;
};

export const useWordsFilter = (
  props: UseWordsFilterParams
): UseWordsFilterResponse => {
  const [searchText, setSearchText] = useState<string>("");
  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  console.log({ searchText });

  const searchFilteredLowerCase = searchText.toLowerCase();
  const wordsFiltered = props.words.filter(({ word, translation, notes }) => {
    return (
      word?.toLowerCase()?.includes(searchFilteredLowerCase) ||
      translation?.toLowerCase()?.includes(searchFilteredLowerCase) ||
      notes?.toLowerCase()?.includes(searchFilteredLowerCase)
    );
  });

  console.log({ wordsFiltered });

  return {
    wordsFiltered,
    searchText,
    onChangeSearchText: handleChangeSearchText,
  };
};
