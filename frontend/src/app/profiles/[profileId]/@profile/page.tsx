import {getVoyagerProfile} from "@/features/profile/api/get-profile";
import {UserProfile} from "@/types/server-response";
import {notFound} from "next/navigation";
import {HeaderBanner} from "@/features/profile/component/HeaderBanner";
import {AvatarSection} from "@/features/profile/component/AvatarSection";
import {ProfileInfo} from "@/features/profile/component/PorfileInfo";


type Params = Promise<{profileId: string | undefined}>
export default async function ProfilePage(
    {
        params,
    }: { params: Params}
) {
    const {profileId} = await  params;
    const [result, err]  = await getVoyagerProfile(profileId!);
    const user = result?.data;
    if(err) {
        throw  err
    }
    if(!user) {
        notFound();
    }
    return (
        <div className="w-full h-fit">
            <div className="w-full">
                <HeaderBanner />
                <div className="flex flex-col md:flex-row md:justify-start w-full">
                    <AvatarSection user={user as UserProfile} />
                    <ProfileInfo user={user as UserProfile} />
                </div>
            </div>
        </div>
    );
}






