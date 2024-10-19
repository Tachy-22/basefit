import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasWalletToken = request.cookies.has('wallet_token')

  // If there's no wallet token and the user is not on the home page, redirect to home
  if (!hasWalletToken && pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If there's a wallet token and the user is on the home page, redirect to dashboard
  if (hasWalletToken && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // For all other cases, continue with the request
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
