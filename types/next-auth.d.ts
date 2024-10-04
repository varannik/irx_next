// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Profile {
    picture?: string;  // Add 'picture' as optional
  }
}