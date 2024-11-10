import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("third log", request.nextUrl.pathname); // => { name: 'vercel', value: 'fast', Path: '/' }

  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  let isWalletConnectedCookie = request.cookies.get("wallet-connection");
  console.log("first log", isWalletConnectedCookie); // => { name: 'nextjs', value: 'fast', Path: '/' }

  if (
    request.nextUrl.pathname.startsWith("/user") &&
    isWalletConnectedCookie?.value !== "TRUE"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
