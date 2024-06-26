import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { serverAuth } from "@/firebase/admin-config";

const NEXT_PUBLIC_COOKIE_SESSION_NAME =
  process.env.NEXT_PUBLIC_COOKIE_SESSION_NAME ?? "";

// Validate session
export async function GET() {
  const session = cookies().get(NEXT_PUBLIC_COOKIE_SESSION_NAME);
  if (!session?.value) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  // Verify id token
  const decodedClaims = await serverAuth.verifyIdToken(session.value);
  if (!decodedClaims) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  return NextResponse.json({ success: true }, { status: 200 });
}
