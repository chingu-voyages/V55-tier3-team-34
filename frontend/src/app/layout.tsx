import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Menubar} from "@/components/ui/menubar/Menubar";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chingu Project Showcase",
  description: "A central hub to host past chingu voyages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <div className="w-full h-screen flex overflow-y-hidden">
              <Menubar />
              <main className="flex flex-1 ">
                  {children}
              </main>
          </div>
      </body>
    </html>
  );
}
