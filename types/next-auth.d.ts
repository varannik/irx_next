// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Profile {
    picture?: string;  // Add 'picture' as optional
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
      accessToken?: string; // Add accessToken here
    };

}
}