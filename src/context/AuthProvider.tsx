"use client";

// react
import React, { useState, useEffect } from "react";

// context
import { AuthContext } from "./AuthContext";
import { cookies } from "next/headers";

// firebase-auth
// import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { User } from "firebase/auth";
import { clientAuth } from "@/firebase/config";
import { useRouter } from "next/navigation";

type TAuthProvider = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: TAuthProvider): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Handle user state changes
  const onAuthStateChanged = async (_user: User | null) => {
    console.log("onAuthStateChanged");
    setUser(_user);
    const idToken = await _user?.getIdToken();
    // document.cookie = `${"cookieKey"}=${idToken}`;
    // if (!idToken) {
    //   router.push("/login");
    // }
  };

  const handleSignOut = () => {
    clientAuth
      .signOut()
      .then(() => window.alert("Log out successfully"))
      .catch(() => window.alert("Unexpected error loging out"));
  };

  useEffect(() => {
    const subscriber = clientAuth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <AuthContext.Provider value={{ user, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
