import { AccessDenied } from "@auth/core/errors";
import { AUTH_PROVIDER } from "@prisma/client";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { onSignUpUser } from "./actions/auth";
import { getUserByEmailOrUsername } from "./actions/user";
import { comparePasswords } from "./lib/utils";

declare module "@auth/core/types" {
  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    enabled: boolean;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ emailOrUsername: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { emailOrUsername, password } = parsedCredentials.data;
          const user = await getUserByEmailOrUsername(emailOrUsername);
          if (!user) return null;
          const passwordsMatch = await comparePasswords(
            password,
            user.password
          );

          if (passwordsMatch) return user;
        }

        console.error("Invalid credentials");
        return null;
      },
    }),
    {
      id: "clerk",
      name: "Clerk",
      type: "oauth",
      authorization: {
        params: { scope: "email profile" },
        url: process.env.AUTH_CLERK_AUTHORIZATION_URL,
      },
      token: process.env.AUTH_CLERK_TOKEN_URL,
      userinfo: process.env.AUTH_CLERK_USERINFO_URL,
      checks: ["state"],
      profile: async (profile) => {
        const user = await onSignUpUser({
          email: profile.email,
          firstname: profile.given_name,
          lastname: profile.family_name,
          authProvider: AUTH_PROVIDER.CLERK,
          image: profile.picture,
        });
        if (!user) throw new Error("Failed to create user");
        return user;
      },
    },
  ],
  callbacks: {
    signIn(params) {
      if (!params.user.enabled) throw new AccessDenied("User is not enabled");
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.image = token.picture;
      return session;
    },
  },
  pages: {
    signIn: "/sing-in",
  },
});
