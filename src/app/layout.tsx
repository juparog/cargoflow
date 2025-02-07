import { auth } from "@/auth";
import { ThemeProvider } from "@/components/theme";
import {
  ModalProvider,
  ReactQueryProvider,
  SessionProvider,
} from "@/providers";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CarfoFlow",
  description: "Optimiza cada entrega",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <ReactQueryProvider>
              <ModalProvider>{children}</ModalProvider>
            </ReactQueryProvider>
          </SessionProvider>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
