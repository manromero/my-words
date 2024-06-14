import { TagType, TagWithIdType } from "@/types";
import {
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/client-config";

export type UseTagResponseType = {
  createTag: (
    tag: TagType
  ) => Promise<DocumentReference<DocumentData, DocumentData>>;
  updateTag: (tag: TagWithIdType) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
};

export const useTag = (): UseTagResponseType => {
  const createTag = async (tag: TagType) => {
    return await addDoc(collection(db, "tags"), tag);
  };

  const updateTag = async (tag: TagWithIdType) => {
    return await updateDoc(doc(db, "tags", tag.id), tag);
  };

  const deleteTag = async (id: string) => {
    return await deleteDoc(doc(db, "tags", id));
  };

  return { createTag, updateTag, deleteTag };
};
