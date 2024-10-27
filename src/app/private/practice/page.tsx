"use client";

import React from "react";
import { PracticeProvider } from "@/context/practice";
import { PlayInitial } from "./playInitial";
import { PlayBoard } from "./playBoard";
import { usePractice } from "@/hooks";

export default function PracticePage() {
  return (
    <PracticeProvider>
      <PlayStateComponentMapper />
    </PracticeProvider>
  );
}

const PLAY_STATE_COMPONENT_MAP = {
  initial: <PlayInitial />,
  playing: <PlayBoard />,
  resume: <h1>TODO Juego completado</h1>,
};

export const PlayStateComponentMapper = () => {
  const { state } = usePractice();

  return PLAY_STATE_COMPONENT_MAP[state];
};
