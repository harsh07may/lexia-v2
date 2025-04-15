import { cache } from "react";

import NextAuth from "next-auth";
import { type DefaultSession, type NextAuthConfig } from "next-auth";

import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";

import { db } from "@/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const authConfig = {
  trustHost: true,
  providers: [GithubProvider],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig;

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);
const auth = cache(uncachedAuth);

export { auth, handlers, signIn, signOut };
