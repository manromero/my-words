import React from "react";
import { WordType } from "@/types";
import { WordForm } from "./wordForm";
import { Modal } from "../commons";

type WordModalFormType = {
  word?: WordType;
  onClose?: () => void;
  onCreate?: (word: WordType) => void;
  onEdit?: (word: WordType) => void;
  onDelete?: () => void;
};

export const WordModalForm = (props: WordModalFormType) => {
  return (
    <Modal open={props.word !== undefined} onClose={props.onClose}>
      <WordForm
        word={props.word}
        onClose={props.onClose}
        onCreate={props.onCreate}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
      />
    </Modal>
  );
};
