import React from "react";
import { PracticeProvider } from "@/context/practice";
import { PlayStateComponentMapper } from "./playStateComponentMapper";

export default function PracticePage() {
  return (
    <PracticeProvider>
      <PlayStateComponentMapper />
    </PracticeProvider>
  );
}
