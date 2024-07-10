import { NextResponse } from "next/server";
import { isAuth } from "./service";

// Validate session
export async function GET() {
  const authenticated = await isAuth();
  if (!authenticated) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  return NextResponse.json({ success: true }, { status: 200 });
}
