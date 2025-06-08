import React from "react";
import {VoyagerCard} from "@/app/profiles/(voyagers)/page";


export default function VoyagersLayout({
                                          children,
                                      }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full p-6 ">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2"> Chingu Voyager</h1>
                <p className="text-gray-600">Meet the amazing developers from the Chingu community who are leveling up their skills
                    through real-world collaboration, open source contributions, and building together.</p>
            </div>
            {children}
        </div>
    );
}
