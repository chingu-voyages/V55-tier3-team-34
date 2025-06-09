"use client"
import {UserDropdownMenu} from "@/features/auth/components/dropdown/UserDropdownMenu";
import {ChinguAsyncLogo} from "@/components/ui/logo";
import React , {useEffect} from "react";
import {useAuthStore} from "@/store/authStore";
import {GithubLoginButton} from "@/features/auth/components/GithubLoginButton";


export default function Header() {
    const fetchUser = useAuthStore((state) => state.fetchUser)
    const user = useAuthStore(state => state.user)
    useEffect(() => {
        fetchUser()
    }, [])
    return(
        <div className="w-full p-4 flex justify-between bg-sidebar-accent border-b-1 border-gray-200 ">
            <div className="mb-2">
                <ChinguAsyncLogo />
            </div>
            <div className="p w-fit">
                {user ?   <UserDropdownMenu user={user} /> : <GithubLoginButton /> }
            </div>
        </div>
    )
}
