"use client";

import { createContext } from "react";
import { User } from "firebase/auth";

export type ContextProps = {
  user: User | null;
  signOut: () => void;
  signInWithGoogle: () => void;
};

export const AuthContext = createContext({} as ContextProps);
