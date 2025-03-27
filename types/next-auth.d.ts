// types/next-auth.d.ts
import NextAuth from "next-auth";

// Extend the default `User` and `Session` types to include `role`
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
    };
  }

  interface User {
    id: string;
    email: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
  }
}
