"use client"
import {Button} from "@/components/ui/button";
import {LogInIcon} from "lucide-react";


export const GithubLoginButton = () => {
    const handleGithubLogin = async () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/github`;
    }
     return(
         <Button
             className="w-24"
             onClick={handleGithubLogin}
             variant="outline">
             Login
             <LogInIcon />
         </Button>
     )
}


