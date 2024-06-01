"use client";

import { createContext } from "react";
import { UseWordsResponseType } from "../../hooks";

type DataContextType = {
  words: UseWordsResponseType;
};

export const DataContext = createContext({} as DataContextType);
