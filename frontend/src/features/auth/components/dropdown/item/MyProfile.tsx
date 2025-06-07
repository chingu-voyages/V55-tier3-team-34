import Link from "next/link";
import {User2Icon} from "lucide-react";
import {UserProfile} from "@/types/server-response";

interface MyProfileProps {
    user:UserProfile
}

export function MyProfile({user}: MyProfileProps) {
    return(
        <Link href={`/profiles/${user.userId}`} className="flex w-full items-center gap-2 ">
            <User2Icon />
            My Profile
        </Link>
    )
}
