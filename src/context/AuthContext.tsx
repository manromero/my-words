"use client";

// react
import { createContext } from "react";

// firebase-auth
import { User } from "firebase/auth";

type ContextProps = {
  user: User | null;
  signOut: () => void;
};

export const AuthContext = createContext({} as ContextProps);
