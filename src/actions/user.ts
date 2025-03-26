"use server";

import client, { handlePrismaError } from "@/lib/prisma";
import { User } from "@prisma/client";

export async function onGetUserByEmail(email: string): Promise<User | null> {
  try {
    const user = await client.user.findFirst({ where: { email } });
    return user;
  } catch (error) {
    throw handlePrismaError(error);
  }
}

export async function onGetUserByEmailOrUsername(
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
    throw handlePrismaError(error);
  }
}

export const onGetUsers = async () => {
  try {
    const users = await client.user.findMany();
    return users;
  } catch (error) {
    throw handlePrismaError(error);
  }
};
