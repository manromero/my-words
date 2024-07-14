"use client";

import { createContext } from "react";
import { User } from "firebase/auth";

export type AuthContextType = {
  user: User | null;
  signOut: () => void;
  signInWithGoogle: () => void;
  signInWithFacebook: () => void;
};

export const AuthContext = createContext({} as AuthContextType);
