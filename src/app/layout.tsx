import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/ui/shared/Navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: "MergeBoost - Social Media Management",
  description: "Adaptogenic Nootropic Drinks for Coders & Creatives",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="font-sans antialiased text-zinc-900 bg-white min-h-screen">
          <Navbar />
          <main className="min-h-screen bg-white">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}