import {UserAvatar} from "@/features/profile/component/UserAvatar";
import {no_profile} from "@/features/auth/components/dropdown/UserMenu";
import {UserProfile} from "@/types/server-response";
import {getAvatarFallback , getDisplayName} from "@/utils/user-info";

interface AccountInfoProps {
    user: UserProfile
}
export function AccountInfo({user}: AccountInfoProps) {
    const profileUrl = user.avatarUrl ?? no_profile
    return(
        <div className="flex gap-2">
            <UserAvatar  fallback={getAvatarFallback(user)} src={profileUrl}/>
            <div>
                <h3 className="text-xs font-bold">{getDisplayName(user)}</h3>
            </div>
        </div>
    )
}
