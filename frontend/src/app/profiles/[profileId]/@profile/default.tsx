import ProfilePage from "./page";

type Params = Promise<{profileId: string | undefined}>
export default function UserProfileDefaultPage({params}: {params: Params}) {
    return <ProfilePage params={params} />
}
