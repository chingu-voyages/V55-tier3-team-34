import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Menubar} from "@/components/ui/menubar/Menubar";
import React from "react";
import Header from "@/components/ui/header/Header";

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
          <div className="w-full h-screen flex flex-col overflow-y-hidden">
              <Header />
              <div className="w-full h-dvh flex">
                  <Menubar />
                  <main className="w-full h-full">
                      {children}
                  </main>
              </div>
          </div>
      </body>
    </html>
  );
}
