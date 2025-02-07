"use server";

import client, { handlePrismaError } from "@/lib/prisma";
import { Prisma, RoleType, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { addMinutes } from "date-fns";
import { onCreateNotification } from "./notification";

export const onSignUpUser = async (
  data: Prisma.UserCreateInput
): Promise<User | null> => {
  try {
    const hashedPassword =
      typeof data.password === "string"
        ? await bcrypt.hash(data.password, 10)
        : null;

    const userCount = await client.user.count();

    const user = await client.user.create({
      data: {
        ...data,
        password: hashedPassword,
        roles: userCount === 0 ? [RoleType.ADMIN] : [RoleType.USER],
      },
    });

    await onCreateNotification({
      title: "Bienvenido 🎉",
      content: `Bienvenido a nuestra plataforma, ${user.firstname}!`,
      createdBy: user.id,
      targetId: user.id,
    });

    return user;
  } catch (error) {
    throw handlePrismaError(error);
  }
};

export async function generateOTPCode(email: string) {
  try {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedCode = await bcrypt.hash(otpCode, 10);
    const expiresAt = addMinutes(new Date(), 10);

    await client.oTP.upsert({
      where: { email },
      create: {
        email,
        code: hashedCode,
        expiresAt,
      },
      update: {
        code: hashedCode,
        expiresAt,
      },
    });

    return otpCode;
  } catch (error) {
    throw handlePrismaError(error);
  }
}

export async function sendOTPCode(email: string) {
  try {
    const otpCode = await generateOTPCode(email);

    // TODO: Envía el OTP por correo (puedes usar un servicio como nodemailer o cualquier servicio de correo)
    // await sendEmail(email, `Your OTP code is ${otpCode}`);
    console.log("OTP code:", otpCode);
  } catch (error) {
    console.error("Failed to send OTP code:", error);
    return { error: "Failed to send OTP code" };
  }
}

export async function verifyOTPCode(email: string, code: string) {
  const otp = await client.oTP.findFirst({
    where: {
      email,
      expiresAt: {
        gte: new Date(),
      },
    },
  });

  const isValid = await bcrypt.compare(code, otp?.code || "");

  if (!otp || !isValid) return { error: "Invalid or expired code" };

  await client.oTP.delete({
    where: { id: otp.id },
  });

  return { success: true };
}
