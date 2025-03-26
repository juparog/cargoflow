import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
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

export const getFilters = (filters: ColumnFiltersState) => ({
  name: filters.find((f) => f.id === "name")?.value as string,
  enabled: (filters.find((f) => f.id === "enabled")?.value as boolean) ?? "all",
});

export const getSorting = (order: SortingState) => {
  return order.map((o) => ({
    [o.id]: o.desc ? "desc" : "asc",
  }));
};

export const formatCurrency = (amount: number | null | undefined): string => {
  if (amount == null) return "$ 0";

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
