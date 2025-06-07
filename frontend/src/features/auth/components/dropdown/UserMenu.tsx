import {UserAvatar} from "@/features/profile/component/UserAvatar";
import {UserProfile} from "@/types/server-response";
import {getAvatarFallback } from "@/utils/user-info";

export const no_profile = '/no-profile.svg'

type UserMenuProps = {
    user: UserProfile
}
export function UserMenu({user}: UserMenuProps) {
    const fallback = getAvatarFallback(user);
    const profileUrl = user?.avatarUrl ?? no_profile;
    return(
        <UserAvatar
            classname="h-10 w-10"
            src={profileUrl}
            fallback={fallback}
        />
    )
}
