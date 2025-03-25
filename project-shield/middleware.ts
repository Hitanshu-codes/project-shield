import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // For this demo, we'll disable the server-side authentication check
  // since we're using localStorage which is client-side only
  // In a real app, you would use cookies or headers for auth
  return NextResponse.next()
}

export const config = {
  matcher: [],
}

