"use client";

import { usePractice } from "@/hooks";
import { PlayBoard } from "./playBoard";
import { PlayInitial } from "./playInitial";
import { PlayResume } from "./playResume";
import { PlayError } from "./playError";

const PLAY_STATE_COMPONENT_MAP = {
  initial: <PlayInitial />,
  playing: <PlayBoard />,
  resume: <PlayResume />,
  error: <PlayError />,
};

export const PlayStateComponentMapper = () => {
  const { state } = usePractice();

  return PLAY_STATE_COMPONENT_MAP[state];
};
