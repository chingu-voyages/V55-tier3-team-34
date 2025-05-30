import {UserDropdownMenu} from "@/features/profile/component/dropdown/UserDropdownMenu";
import {ChinguAsyncLogo} from "@/components/ui/logo";
import React from "react";


export default function Header() {
    return(
        <div className="w-full p-4 flex justify-between bg-sidebar-accent border-b-1 border-gray-200 ">
            <div className="mb-2">
                <ChinguAsyncLogo />
            </div>
            <div className="p">
                <UserDropdownMenu />
            </div>
        </div>
    )
}
