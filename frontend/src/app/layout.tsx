import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Menubar} from "@/components/ui/menubar/Menubar";
import React , {Suspense} from "react";
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
        <div className="w-full h-screen flex flex-col">
            <Header />
            <div className="w-full flex-1 flex overflow-hidden">
                <Menubar />
                <main className="flex-1 overflow-y-auto">
                    <Suspense>
                        {children}
                    </Suspense>
                </main>
            </div>
        </div>
        </body>
        </html>
    );
}
