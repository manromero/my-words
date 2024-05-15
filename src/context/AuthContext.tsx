"use client";

import { createContext } from "react";
import { User } from "firebase/auth";

export type SignInParamsType = {
  email: string;
  password: string;
};

export type CreateUserParamsType = {
  email: string;
  password: string;
};

export type ContextProps = {
  user: User | null;
  signOut: () => void;
  signIn: (params: SignInParamsType) => void;
  signInWithGoogle: () => void;
  createUser: (params: CreateUserParamsType) => void;
};

export const AuthContext = createContext({} as ContextProps);
