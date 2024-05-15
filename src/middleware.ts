// middleware.js

import { NextRequest, NextResponse } from "next/server";

const NEXT_PUBLIC_COOKIE_SESSION_NAME =
  process.env.NEXT_PUBLIC_COOKIE_SESSION_NAME ?? "";

export async function middleware(request: NextRequest, response: any) {
  const session = request.cookies.get(NEXT_PUBLIC_COOKIE_SESSION_NAME);

  // If there is no cookie, return to login page
  if (!session?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Validate cookie
  const responseAPI = await fetch(`${request.nextUrl.origin}/api/auth`, {
    headers: {
      Cookie: `${NEXT_PUBLIC_COOKIE_SESSION_NAME}=${session.value}`,
    },
  });

  // If the cookie is not right redirect to the login page
  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow to continue
  return NextResponse.next();
}

// Protected routes
export const config = {
  matcher: ["/", "/tagForm"],
};
