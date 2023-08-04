import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req, res) {
    // callback permission granted to call this function
    const { token } = req.nextauth;
    const { pathname, origin } = req.nextUrl;

    // Auth page redirect
    if (pathname === "/auth" && token) {
      return NextResponse.redirect(origin);
    }
  },
  {
    callbacks: {
      authorized({ token, req }) {
        const { pathname } = req.nextUrl;
        if (pathname === "/auth" || pathname.startsWith("/api")) {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/:path*"],
};
