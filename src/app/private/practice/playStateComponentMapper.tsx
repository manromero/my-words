"use client";

import { usePractice } from "@/hooks";
import { PlayBoard } from "./playBoard";
import { PlayInitial } from "./playInitial";

const PLAY_STATE_COMPONENT_MAP = {
  initial: <PlayInitial />,
  playing: <PlayBoard />,
  resume: <h1>TODO Juego completado</h1>,
};

export const PlayStateComponentMapper = () => {
  const { state } = usePractice();

  return PLAY_STATE_COMPONENT_MAP[state];
};
