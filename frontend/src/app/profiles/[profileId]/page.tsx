import VoyagerBadge from "@/components/ui/badges/VoyagerBadge";
import {Calendar } from "lucide-react";
import {UserAvatar} from "@/features/profile/component/UserAvatar";
import {getAuthenticatedUser , getVoyagerProfile} from "@/features/profile/api/get-profile";
import {redirect} from "next/navigation";
import {User} from "@/types/user";
import {formatDate} from "@/utils/format";


type Params = Promise<{profileId: string}>

export default async function ProfilePage(
    {
        params,
    }: { params: Params}
) {
    const {profileId} = await  params;
    const [user, e] = await getAuthenticatedUser();
    const [result, err]  = await getVoyagerProfile(profileId);

    return (
        <div className="w-full h-full md:px-12 bg-gray-100">
            <div className="w-full">
                <HeaderBanner />
                <div className="flex flex-col md:flex-row md:justify-start w-full">
                    <AvatarSection user={result.data as User} />
                    <ProfileInfo user={result.data} />
                </div>
            </div>
        </div>
    );
}

export function HeaderBanner() {
    return (
        <div className="flex items-center bg-tertiary w-full h-24 md:h-46 rounded-sm bg-[url('/drawing.png')] bg-contain bg-no-repeat bg-right"></div>
    );
}


type AvatarSectionProps = {
    user: User
}
export  function AvatarSection({
    user
                               }: AvatarSectionProps) {
    return (
        <div className="-mt-8 pl-6 md:-mt-16 md:pl-12">
            <UserAvatar  src={user.avatarUrl ?? '/no-profile.svg'} classname="w-24 h-24 md:w-52 md:h-52 bg-background" />
        </div>
    );
}

type ProfileInfoProps = {
    user: User
}
export function ProfileInfo({
    user
                            }: ProfileInfoProps) {
    return (
        <div className="flex flex-1 flex-col p-4 gap-2">
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <div className="text-lg md:text-2xl font-bold flex items-center gap-2">
                        <h3>{user.displayName}</h3>
                        <VoyagerBadge />
                    </div>
                    <span className="flex items-center gap-2 text-gray-text">
                            <Calendar size={22} />
                        {`Joined at ${formatDate(user.createdAt)}`}
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-gray-text">@rirynomenjanahary</p>
                </div>
            </div>
            <p className="leading-6 text-sm md:text-base text-gray-text">
                Master’s student in Computer Science | Passionate about AI, Robotics & Real-World Problem Solving  | Building impactful apps for Madagascar
            </p>
        </div>
    );
}
