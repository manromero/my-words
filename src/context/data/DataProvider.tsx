"use client";

import React from "react";

import { DataContext } from "./DataContext";

import { useTags, useWords } from "../../hooks";

type DataProviderType = {
  children: React.ReactNode;
};

export const DataProvider = ({ children }: DataProviderType): JSX.Element => {
  const words = useWords();
  const tags = useTags();
  return (
    <DataContext.Provider value={{ words, tags }}>
      {children}
    </DataContext.Provider>
  );
};
