import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const authCookie = request.cookies.get("admin-auth");
    
    if (!authCookie || authCookie.value !== "true") {
      const loginUrl = new URL("/adminLogin", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
