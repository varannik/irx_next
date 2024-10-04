// types/session.d.ts or interfaces/session.d.ts

import { DefaultSession } from "next-auth";


export default interface UserSession {
  user: {

      name?: string | null;
      email?: string | null;
      image?: string | null;
      // Add any custom fields below
      role?: string; // Example: role
      // Add more custom fields here
    } & DefaultSession["user"]; // Extend with the default user type
  }

