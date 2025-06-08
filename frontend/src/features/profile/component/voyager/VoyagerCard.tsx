import {UserProfile} from "@/types/server-response";
import {Card , CardContent , CardFooter} from "@/components/ui/card";
import {UserAvatar} from "@/features/profile/component/UserAvatar";
import {no_profile} from "@/features/auth/components/dropdown/UserMenu";
import {getAvatarFallback , getDisplayName} from "@/utils/user-info";
import Link from "next/link";
import {navigationPaths} from "@/config/navigation";
import {Button} from "@/components/ui/button";
import React from "react";

type VoyagerCardProps = {
    user: UserProfile
}
export function VoyagerCard({user}: VoyagerCardProps) {
    return(
        <Card className="group rounded-xl border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:shadow-md transition-all duration-300 overflow-hidden">
            <CardContent className="flex flex-col items-center p-8 space-y-4">
                <div className="relative">
                    <UserAvatar
                        classname="h-20 w-20 ring-2 ring-primary/10 group-hover:ring-primary/20 transition-all duration-300"
                        src={user.avatarUrl ?? no_profile}
                        fallback={getAvatarFallback(user)}
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="text-center space-y-1">
                    <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                        {getDisplayName(user)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Joined {new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                    })}
                    </p>
                </div>
            </CardContent>
            <CardFooter className="pt-0 pb-6 px-8">
                <Link className="w-full" href={navigationPaths.profile(user.userId)}>
                    <Button
                        variant="ghost"
                        className="flex justify-center items-center w-full h-9 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 border border-border/50 hover:border-primary/20 rounded-lg transition-all duration-200 group-hover:translate-y-0 translate-y-1"
                    >
                        View Profile
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
