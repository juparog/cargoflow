"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import dynamic from "next/dynamic";
import * as React from "react";

function ThemeProviderComponent({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export const ThemeProvider = dynamic(
  () => Promise.resolve(ThemeProviderComponent),
  { ssr: false }
);
