import { AccessDenied } from "@auth/core/errors";
import { AuthProviderType } from "@prisma/client";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { onSignUpUser } from "./actions/auth";
import { onGetUserByEmailOrUsername } from "./actions/user";
import { comparePasswords } from "./lib/utils";

declare module "@auth/core/types" {
  interface User {
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
          const user = await onGetUserByEmailOrUsername(emailOrUsername);
          if (!user) return null;
          const passwordsMatch = await comparePasswords(
            password,
            user.password
          );

          if (passwordsMatch) {
            return {
              ...user,
              name: `${user.firstname} ${user.lastname}`,
              image: user.image,
              roles: user.roles,
              enabled: user.enabled,
            };
          }
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
        const userExists = await onGetUserByEmailOrUsername(profile.email);
        if (userExists) return userExists;

        const userCreated = await onSignUpUser({
          email: profile.email,
          firstname: profile.given_name,
          lastname: profile.family_name,
          authProvider: AuthProviderType.CLERK,
          image: profile.picture,
          emailVerified: new Date(),
        });
        if (!userCreated) throw new Error("Failed to create user");

        return {
          ...userCreated,
          name: `${userCreated.firstname} ${userCreated.lastname}`,
          image: userCreated.image,
          enabled: userCreated.enabled,
        };
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
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.image = token.picture;
      session.user.name = token.name;
      return session;
    },
  },
  pages: {
    signIn: "/sing-in",
  },
});
