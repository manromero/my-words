// app/api/auth/route.js

import { auth } from "firebase-admin";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { initialiceServerApp } from "@/firebase/admin-config";

const NEXT_PRIVATE_COOKIE_SESSION_NAME =
  process.env.NEXT_PRIVATE_COOKIE_SESSION_NAME ?? "";

initialiceServerApp();

// TODO MANROMERO change the name functions
// Create user
export async function POST() {
  // console.log("POST.............");
  const authorization = headers().get("Authorization");
  if (authorization?.startsWith("Bearer ")) {
    const idToken = authorization.split("Bearer ")[1];
    const decodedToken = await auth().verifyIdToken(idToken);

    if (decodedToken) {
      // Generate cookie
      const expiresIn = 60 * 60 * 24 * 1 * 1000;
      const sessionCookie = await auth().createSessionCookie(idToken, {
        expiresIn,
      });
      const options = {
        name: NEXT_PRIVATE_COOKIE_SESSION_NAME,
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      };
      // Set cookie in the browser
      cookies().set(options);
    }
  }

  return NextResponse.json({}, { status: 200 });
}

// Auth user
export async function GET() {
  console.log("GET.............");
  const session = cookies().get(NEXT_PRIVATE_COOKIE_SESSION_NAME)?.value || "";
  console.log("--", session);
  // Validate session
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }
  // Varidate cookie using firebase
  const decodedClaims = await auth().verifySessionCookie(session, true);
  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }
  return NextResponse.json({ isLogged: true }, { status: 200 });
}
