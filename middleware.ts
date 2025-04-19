import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("isAuthenticated")?.value === "true";
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isSignUpPage = request.nextUrl.pathname === "/signup";

  // If user is not authenticated and trying to access protected routes
  if (!isAuthenticated && !isLoginPage && !isSignUpPage) {
    const response = NextResponse.redirect(new URL("/login", request.url));
    // Clear any existing auth cookie
    response.cookies.delete("isAuthenticated");
    return response;
  }

  // If user is authenticated and trying to access login/signup pages
  if (isAuthenticated && (isLoginPage || isSignUpPage)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}; 