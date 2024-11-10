import React from "react";
import { TagType } from "@/types";
import { Modal } from "../commons";
import { TagForm } from "./tagForm";

type TagModalFormType = {
  tag?: TagType;
  onClose?: () => void;
  onCreate?: (tag: TagType) => void;
  onEdit?: (tag: TagType) => void;
  onDelete?: () => void;
};

export const TagModalForm = (props: TagModalFormType) => {
  return (
    <Modal open={props.tag !== undefined} onClose={props.onClose}>
      <TagForm
        tag={props.tag}
        onCreate={props.onCreate}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
        onClose={props.onClose}
      />
    </Modal>
  );
};
