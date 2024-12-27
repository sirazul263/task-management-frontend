import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;
  const publicRoutes = ["/sign-in", "/sign-up", "/forgot-password"];
  if (
    req.nextUrl.pathname.startsWith("/logo.svg") || // Public images
    req.nextUrl.pathname.startsWith("/_next/static") || // Next.js static files
    req.nextUrl.pathname.startsWith("/_next/image") || // Next.js optimized images
    req.nextUrl.pathname.startsWith("/favicon.ico") // Favicon
  ) {
    return NextResponse.next();
  }
  if (publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return NextResponse.next();
    }
  }

  // Protect all other routes
  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Protect all routes except API and assets
};
