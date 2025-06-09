import React from "react";
import {UserProfileNavigation} from "@/features/profile/component/profile/UserProfileNavigation";



export default function ProfileLayout({
    profile,
    data
                                      }: {
    profile: React.ReactNode,
    data: React.ReactNode
}) {

    return(
        <div className="w-full h-full md:px-12 bg-gray-100">
            <section>
                {profile}
            </section>
            <nav>
                <UserProfileNavigation />
            </nav>
            <section>
                {data}
            </section>
        </div>
    )
}
