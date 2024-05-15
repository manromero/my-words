"use client";

import React, { useState, useEffect } from "react";
import {
  AuthContext,
  CreateUserParamsType,
  SignInParamsType,
} from "./AuthContext";
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { clientAuth } from "@/firebase/client-config";
import { useRouter } from "next/navigation";

const NEXT_PUBLIC_COOKIE_SESSION_NAME =
  process.env.NEXT_PUBLIC_COOKIE_SESSION_NAME ?? "";

type TAuthProvider = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: TAuthProvider): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const onAuthStateChanged = async (_user: User | null) => {
    setUser(_user);
  };

  const handleSignOut = () => {
    clientAuth
      .signOut()
      .then(() => window.alert("Log out successfully"))
      .catch(() => window.alert("Unexpected error loging out"));
  };

  const handleSignIn = async ({ email, password }: SignInParamsType) => {
    signInWithEmailAndPassword(clientAuth, email.trim(), password)
      .then(async (userCred) => {
        const idToken = await userCred.user.getIdToken();
        if (idToken) {
          document.cookie = `${NEXT_PUBLIC_COOKIE_SESSION_NAME}=${idToken}`;
          router.push("/");
        }
      })
      .catch((error) => {
        alert(`Login failed: ${error.message} - ${error.code}`);
      });
  };

  const handleSignInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(clientAuth, googleProvider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential) {
          return;
        }
        const userCred = await signInWithCredential(clientAuth, credential);
        const idToken = await userCred.user.getIdToken();
        if (idToken) {
          document.cookie = `${NEXT_PUBLIC_COOKIE_SESSION_NAME}=${idToken}`;
          router.push("/");
        }
      })
      .catch((error) => {
        alert(`Login failed: ${error.message} - ${error.code}`);
      });
  };

  const handleCreateUser = async ({
    email,
    password,
  }: CreateUserParamsType) => {
    createUserWithEmailAndPassword(clientAuth, email, password)
      .then(async (userCred) => {
        const idToken = await userCred.user.getIdToken();
        if (idToken) {
          document.cookie = `${NEXT_PUBLIC_COOKIE_SESSION_NAME}=${idToken}`;
          router.push("/");
        }
      })
      .catch((error) => {
        alert(`Sign up failed: ${error.message} - ${error.code}`);
      });
  };

  useEffect(() => {
    const subscriber = clientAuth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signOut: handleSignOut,
        signIn: handleSignIn,
        signInWithGoogle: handleSignInWithGoogle,
        createUser: handleCreateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
