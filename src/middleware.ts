import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const isPublicRoute = createRouteMatcher(["/", "/sign-in", "/sign-up"]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // For any route that is not public, require authentication
  auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
