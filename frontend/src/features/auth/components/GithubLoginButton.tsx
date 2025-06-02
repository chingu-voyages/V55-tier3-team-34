"use client"
import {Button} from "@/components/ui/button";


export const GithubLoginButton = () => {
    const handleGithubLogin = async () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/github`;
    }
     return(
         <Button
             className="w-full "
             onClick={handleGithubLogin}
             variant="ghost">
             Login with github
         </Button>
     )
}
