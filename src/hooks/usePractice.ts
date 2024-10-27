import { useContext } from "react";
import { PracticeContext } from "../context";

export const usePractice = () => {
  return useContext(PracticeContext);
};
