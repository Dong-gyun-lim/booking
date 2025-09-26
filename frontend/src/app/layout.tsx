// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/site/nav-bar";
import ThemeProvider from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Booking",
  description: "Next.js + shadcn starter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <NavBar />
          <main className="mx-auto max-w-screen-xl px-4 py-8">{children}</main>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}

<Toaster />;
