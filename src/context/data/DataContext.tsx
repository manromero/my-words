"use client";

import { createContext } from "react";
import { UseTagsResponseType, UseWordsResponseType } from "../../hooks";

type DataContextType = {
  words: UseWordsResponseType;
  tags: UseTagsResponseType;
};

export const DataContext = createContext({} as DataContextType);
