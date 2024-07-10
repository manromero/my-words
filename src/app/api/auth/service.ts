import { cookies } from "next/headers";
import { serverAuth } from "@/firebase/admin-config";

const NEXT_PUBLIC_COOKIE_SESSION_NAME =
  process.env.NEXT_PUBLIC_COOKIE_SESSION_NAME ?? "";

export const isAuth = async () => {
  const session = cookies().get(NEXT_PUBLIC_COOKIE_SESSION_NAME);
  if (!session?.value) {
    return false;
  }
  // Verify id token
  const decodedClaims = await serverAuth.verifyIdToken(session.value);
  if (!decodedClaims) {
    return false;
  }
  return true;
};
