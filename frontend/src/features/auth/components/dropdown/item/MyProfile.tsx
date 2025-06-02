import Link from "next/link";
import {User2Icon} from "lucide-react";

export function MyProfile() {
    return(
        <Link href="/profiles/125" className="flex w-full items-center gap-2 ">
            <User2Icon />
            My Profile
        </Link>
    )
}
