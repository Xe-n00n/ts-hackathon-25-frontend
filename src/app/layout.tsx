import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { AuthProvider } from "@/lib/AuthContext";
import { StoryGenerationProvider } from "@/lib/StoryGenerationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hikaaya",
  description: "Stories by you, for you.",
  icons: {
    icon: '/Main Logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} `}>
        <StoryGenerationProvider>
          <AuthProvider>
            <div className="flex flex-col md:flex-row min-h-screen">
              <Navbar />
              <main className="flex-1 w-full pt-28 md:pt-0">
                {children}
              </main>
            </div>
          </AuthProvider>
        </StoryGenerationProvider>
      </body>
    </html>
  );
}
