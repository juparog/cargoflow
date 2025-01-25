"use server";

import client from "@/lib/prisma";
import { User } from "@prisma/client";

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const user = await client.user.findFirst({ where: { email } });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function getUserByEmailOrUsername(
  emailOrUsername: string
): Promise<User | null> {
  try {
    const user = await client.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
