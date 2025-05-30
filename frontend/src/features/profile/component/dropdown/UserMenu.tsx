import {UserAvatar} from "@/features/profile/component/UserAvatar";

export const no_profile = '/no-profile.svg'
export function UserMenu() {
    return(
        <UserAvatar
            classname="h-10 w-10"
            src={no_profile}
            fallback="AN"
        />
    )
}
