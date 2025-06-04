import {UserAvatar} from "@/features/profile/component/UserAvatar";
import {no_profile} from "@/features/auth/components/dropdown/UserMenu";

export function AccountInfo() {
    return(
        <div className="flex gap-2">
            <UserAvatar  fallback="RN" src={no_profile}/>
            <div>
                <h3 className="text-xs font-bold">Riry Nomenjanahary</h3>
            </div>
        </div>
    )
}
