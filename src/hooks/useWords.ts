import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../context";
import { WordType } from "@/types";
import {
  QuerySnapshot,
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "@/firebase/client-config";

type UseWordsResponseType = {
  data: WordType[];
  loading: boolean;
  error: boolean;
};

// TODO MANROMERO MANROMERO create a data provider that wrapp all the login part
export const useWords = (): UseWordsResponseType => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<WordType[]>([]);
  const { user } = useContext(AuthContext);

  const handleOnSnapShotResults = (query: QuerySnapshot<WordType>) => {
    setLoading(false);
    setError(false);
    console.log("query", query.docs);
    const words = query.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setData(words);
  };

  const handleOnSnapShotError = () => {
    setLoading(false);
    setError(true);
    window.alert("Error when retrieving the words");
  };

  useEffect(() => {
    if (!user) {
      setLoading(false);
      setError(false);
      setData([]);
      return;
    }
    setLoading(true);
    const q = query(collection(db, "words"));
    const unsubscribe = onSnapshot(
      q,
      handleOnSnapShotResults,
      handleOnSnapShotError
    );
    return () => unsubscribe();
  }, [user]);

  return { data, error, loading };
};
