"use client";

import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  User,
  signInWithCredential,
  signInWithPopup,
} from "firebase/auth";
import { clientAuth } from "@/firebase/client-config";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes";

const NEXT_PUBLIC_COOKIE_SESSION_NAME =
  process.env.NEXT_PUBLIC_COOKIE_SESSION_NAME ?? "";

type TAuthProvider = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: TAuthProvider): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
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
    const provider = new GoogleAuthProvider();
    setLoading(true);
    signInWithPopup(clientAuth, provider)
      .then(async (result) => {
        const idToken = await result.user.getIdToken();
        if (idToken) {
          document.cookie = `${NEXT_PUBLIC_COOKIE_SESSION_NAME}=${idToken}`;
          router.push(ROUTES.PRIVATE_MAIN);
        }
      })
      .catch((e) => {
        console.error("Login failed....");
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSignInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    setLoading(true);
    signInWithPopup(clientAuth, provider)
      .then(async (result) => {
        const idToken = await result.user.getIdToken();
        if (idToken) {
          document.cookie = `${NEXT_PUBLIC_COOKIE_SESSION_NAME}=${idToken}`;
          router.push(ROUTES.PRIVATE_MAIN);
        }
      })
      .catch((e) => {
        console.error("Login failed....");
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
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
        loading,
        signOut: handleSignOut,
        signInWithGoogle: handleSignInWithGoogle,
        signInWithFacebook: handleSignInWithFacebook,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
