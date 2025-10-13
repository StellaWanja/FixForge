import { NextResponse, type NextRequest } from "next/server";
import { getUserFromSession } from "./lib/auth/session";

const publicRoutes = ["/", "/login", "/register"];
const adminRoutes = ["/admin"];

export async function middleware(request: NextRequest) {
  const response = (await middlewareAuth(request)) ?? NextResponse.next();
  return response;
}

// checks if the user is authenticated and authorized to access certain routes
async function middlewareAuth(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // If not signed in → redirect to login
  const user = await getUserFromSession();
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If route is admin-only but user isn't admin → redirect
  if (adminRoutes.includes(pathname)) {
    const user = await getUserFromSession();
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (user.role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
