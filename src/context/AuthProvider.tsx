"use client";

import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {
  GoogleAuthProvider,
  User,
  signInWithCredential,
  signInWithPopup,
} from "firebase/auth";
import { clientAuth, db } from "@/firebase/client-config";
import { useRouter } from "next/navigation";
import { collection, query, getDocs } from "firebase/firestore";
import { ROUTES } from "@/routes";

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

  const handleSignOut = async () => {
    try {
      await clientAuth.signOut();
      // Delete cookie
      document.cookie = `${NEXT_PUBLIC_COOKIE_SESSION_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      router.push("/");
    } catch (e) {
      console.log("Error: ", e);
      // TODO MANROMERO some kind of alert
      window.alert("Unexpected error when logout");
    }
  };

  const handleSignInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(clientAuth, googleProvider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential) {
          return;
        }
        const userCred = await signInWithCredential(clientAuth, credential);
        const idToken = await userCred.user.getIdToken();
        if (idToken) {
          document.cookie = `${NEXT_PUBLIC_COOKIE_SESSION_NAME}=${idToken}`;
          router.push(ROUTES.PRIVATE_MAIN);
        }
      })
      .catch(() => {
        console.error("Login failed....");
      });
  };

  useEffect(() => {
    const subscriber = clientAuth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // TODO MANROMERO cambiar
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "words"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    };
    fetchData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signOut: handleSignOut,
        signInWithGoogle: handleSignInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
