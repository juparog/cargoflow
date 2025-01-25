"use server";

import client from "@/lib/prisma";
import { AUTH_PROVIDER, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { addMinutes } from "date-fns";

// export const onAuthenticatedUser = async () => {
//   try {
//     const auth
//   } catch (error) {

//   }
// }

export const onSignUpUser = async (data: {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  authProvider?: AUTH_PROVIDER;
  username?: string | null;
  image?: string | null;
}): Promise<User | null> => {
  try {
    const hashedPassword = data.password
      ? await bcrypt.hash(data.password, 10)
      : null;
    const commonData = {
      authProvider: data.authProvider || AUTH_PROVIDER.CREDENTIAL,
      emailVerified: new Date(),
      image: data.image,
    };
    const user = await client.user.upsert({
      where: { email: data.email },
      create: {
        ...data,
        ...commonData,
        password: hashedPassword,
      },
      update: {
        ...commonData,
      },
    });

    return user;
  } catch (error) {
    console.error("Failed to register user:", error);
    return null;
  }
};

export async function generateOTPCode(email: string) {
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
