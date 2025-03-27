import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host");
  const subdomain = hostname?.split(".")[0];

  if (subdomain && subdomain !== "www" && subdomain !== "localhost") {
    // Special condition for 'admin' subdomain
    if (subdomain === "admin") {
      return NextResponse.rewrite(new URL(`/admin/dashboard`, request.url));
    }

    // Default behavior for other subdomains
    return NextResponse.rewrite(new URL(`/${subdomain}`, request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
