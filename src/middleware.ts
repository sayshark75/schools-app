import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const isLocalhost = hostname.startsWith("localhost");

  // Handle localhost or root domain (no subdomain)
  if (isLocalhost || hostname === "example.com") {
    return NextResponse.next(); // Let Next.js handle the root domain normally
  }

  const subdomain = hostname.split(".")[0];

  // Admin subdomain logic
  if (subdomain === "admin") {
    return NextResponse.rewrite(new URL(`/admin/dashboard`, request.url));
  }

  // Unknown subdomains should redirect to their respective pages
  return NextResponse.rewrite(new URL(`/${subdomain}`, request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
