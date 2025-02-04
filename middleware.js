import { clerkMiddleware } from "@clerk/nextjs/server";
import { createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)', 
  '/forum(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Check if the current route is a protected route
  if (isProtectedRoute(req)) {
    // Protect the route by requiring authentication
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Exclude Next.js internals and static files (HTML, CSS, JS, images, etc.)
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Apply middleware to all API routes and TRPC endpoints
    '/(api|trpc)(.*)',
  ],
};
