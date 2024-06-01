"use client";

import React from "react";

import { DataContext } from "./DataContext";

import { useWords } from "../../hooks";

type DataProviderType = {
  children: React.ReactNode;
};

export const DataProvider = ({ children }: DataProviderType): JSX.Element => {
  const words = useWords();
  return (
    <DataContext.Provider value={{ words }}>{children}</DataContext.Provider>
  );
};
