import { NextRequest, NextResponse } from "next/server";
import { SPLITTER } from "./constants";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token_login")?.value;
  const storeToken = process.env.TOKEN_LOGIN as string;
  if (!token) {
    return NextResponse.redirect(new URL(`/login`, request.url));
  }
  const [envToken, hex] = token.split(SPLITTER);

  if (
    storeToken === envToken &&
    parseInt(hex, 16) - Date.now() < 1000 * 60 * 60 * 24
  ) {
    return;
  }
  return NextResponse.redirect(new URL(`/login`, request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
};
