import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
 

  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API

  let isWalletConnectedCookie = request.cookies.get("wallet-connection");


  if (
    request.nextUrl.pathname.startsWith("/user") &&
    isWalletConnectedCookie?.value !== "TRUE"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
