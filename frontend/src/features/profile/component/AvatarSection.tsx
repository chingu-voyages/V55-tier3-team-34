import {UserProfile} from "@/types/server-response";
import {UserAvatar} from "@/features/profile/component/UserAvatar";
import {no_profile} from "@/features/profile/component/dropdown/UserMenu";
import {getAvatarFallback} from "@/utils/user-info";

type AvatarSectionProps = {
    user: UserProfile
}
export  function AvatarSection({
                                   user
                               }: AvatarSectionProps) {
    return (
        <div className="-mt-8 pl-6 md:-mt-16 md:pl-12">
            <UserAvatar  src={user.avatarUrl ?? no_profile} classname="w-24 h-24 md:w-52 md:h-52 bg-background"  fallback={getAvatarFallback(user)}/>
        </div>
    );
}
