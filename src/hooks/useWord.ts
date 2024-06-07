import { WordType, WordWithIdType } from "@/types";
import {
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/client-config";

export type UseWordResponseType = {
  createWord: (
    word: WordType
  ) => Promise<DocumentReference<DocumentData, DocumentData>>;
  updateWord: (word: WordWithIdType) => Promise<void>;
};

export const useWord = (): UseWordResponseType => {
  const createWord = async (word: WordType) => {
    return await addDoc(collection(db, "words"), word);
  };

  const updateWord = async (word: WordWithIdType) => {
    return await updateDoc(doc(db, "words", word.id), word);
  };

  return { createWord, updateWord };
};
