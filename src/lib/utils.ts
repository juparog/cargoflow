import bcrypt from "bcryptjs";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function comparePasswords(
  password: string,
  hashedPassword: string | null
): Promise<boolean> {
  try {
    if (!hashedPassword) return false;
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    return passwordsMatch;
  } catch (error) {
    console.error("Failed to compare passwords:", error);
    throw new Error("Failed to compare passwords.");
  }
}
