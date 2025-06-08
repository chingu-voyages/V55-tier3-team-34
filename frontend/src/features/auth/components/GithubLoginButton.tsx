"use client"
import {Button} from "@/components/ui/button";
import {LogInIcon} from "lucide-react";


export const GithubLoginButton = () => {
    const handleGithubLogin = async () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/github`;
    }
    return(
        <Button
            className="group flex justify-center items-center relative overflow-hidden bg-transparent hover:bg-primary/5 text-primary border border-primary/20 hover:border-primary/40 font-medium px-6 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            onClick={handleGithubLogin}
            variant="outline">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-2">
                <LogInIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5 duration-200" />
                <span className="text-sm">Login</span>
            </div>
        </Button>
    )
}


