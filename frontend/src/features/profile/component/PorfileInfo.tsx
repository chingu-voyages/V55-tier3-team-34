import {UserProfile} from "@/types/server-response";
import {getDisplayName} from "@/utils/user-info";
import VoyagerBadge from "@/components/ui/badges/VoyagerBadge";
import {Calendar} from "lucide-react";
import {formatDate} from "@/utils/format";

type ProfileInfoProps = {
    user: UserProfile
}
export function ProfileInfo({
                                user
                            }: ProfileInfoProps) {
    const formattedUsername = `@${getDisplayName(user).toLowerCase().split(" ").join("")}`
    return (
        <div className="flex flex-1 flex-col p-4 gap-2">
            <div className="flex flex-col">
                <div className="flex justify-between">
                    <div className="text-lg md:text-2xl font-bold flex items-center gap-2">
                        <h3>{getDisplayName(user)}</h3>
                        <VoyagerBadge />
                    </div>
                    <span className="flex items-center gap-2 text-gray-text">
                            <Calendar size={22} />
                        {`Joined at ${formatDate(user.createdAt)}`}
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-gray-text">{formattedUsername}</p>
                </div>
            </div>
            <p className="leading-6 text-sm md:text-base text-gray-text">
                {user.bio}
            </p>
        </div>
    );
}
