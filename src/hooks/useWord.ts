import { WordType, WordWithIdType } from "@/types";
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

export type UseWordResponseType = {
  createWord: (
    word: WordType
  ) => Promise<DocumentReference<DocumentData, DocumentData>>;
  updateWord: (word: WordWithIdType) => Promise<void>;
  deleteWord: (id: string) => Promise<void>;
};

export const useWord = (): UseWordResponseType => {
  const createWord = async (word: WordType) => {
    return await addDoc(collection(db, "words"), word);
  };

  const updateWord = async (word: WordWithIdType) => {
    return await updateDoc(doc(db, "words", word.id), word);
  };

  const deleteWord = async (id: string) => {
    return await deleteDoc(doc(db, "words", id));
  };

  return { createWord, updateWord, deleteWord };
};
