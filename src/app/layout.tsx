import type { Metadata } from "next";
import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/ui/shared/Navbar";

import "./globals.css";

// Notion-style Font Stacks
const sans = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

const serif = Source_Serif_4({ 
  subsets: ["latin"], 
  variable: "--font-serif" 
});

const mono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-mono" 
});

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
      <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
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