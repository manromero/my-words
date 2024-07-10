import { NextResponse } from "next/server";
import { isAuthenticated } from "./service";

// Validate session
export async function GET() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  return NextResponse.json({ success: true }, { status: 200 });
}
