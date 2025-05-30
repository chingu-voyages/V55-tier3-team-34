import {Card , CardContent , CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {getVoyagers} from "@/features/profile/api/get-voyagers";
import {UserAvatar} from "@/features/profile/component/UserAvatar";
import {no_profile} from "@/features/profile/component/dropdown/UserMenu";
import {getAvatarFallback , getDisplayName} from "@/utils/user-info";
import {navigationPaths} from "@/config/navigation";
import {UserProfile} from "@/types/server-response";




export default async function VoyagerListPage() {
    const [response, error] = await  getVoyagers();
    const users = response?.data ?? []
    return (
        <div className="w-full p-4 ">
            <div className="bg-gradient-to-r from-accent-100 via-pink-100 to-tertiary-100 p-6 rounded-2xl shadow mb-6">
                <h1 className="text-3xl font-bold text-accent">🌟 Chingu Voyagers</h1>
                <p className="text-gray-700 mt-2 max-w-2xl">
                    Meet the amazing developers from the Chingu community who are leveling up their skills
                    through real-world collaboration, open source contributions, and building together.
                </p>
            </div>
            <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {users.map((user) => (
                    <VoyagerCard key={user.userId} user={user} />
                ))}
            </div>
        </div>
    );
}


type VoyagerCardProps = {
    user: UserProfile
}
export function VoyagerCard({user}: VoyagerCardProps) {
    return(
        <Card  className="rounded-2xl  hover:shadow-lg transition-shadow">
            <CardContent className="flex flex-col items-center p-6">
                <UserAvatar classname="h-24 w-24" src={user.avatarUrl ?? no_profile} fallback={getAvatarFallback(user)} />
                <h3 className="text-lg font-semibold text-center">{getDisplayName(user)}</h3>
            </CardContent>
            <CardFooter>
                <Link className="w-full" href={navigationPaths.profile(user.userId)}>
                    <Button variant="primary" className="w-full cursor-pointer">View Profile</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
