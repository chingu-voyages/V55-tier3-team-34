import {UserAvatar} from "@/features/profile/component/UserAvatar";

export function AccountInfo() {
    return(
        <div className="flex gap-2">
            <UserAvatar />
            <div>
                <h3 className="text-xs font-bold">Riry Nomenjanahary</h3>
            </div>
        </div>
    )
}
