import UserProjectListPage from "./projects/page";


export default function UserDataDefaultPage({params}: {params: Promise<{profileId: string}>}) {
    return <UserProjectListPage params={params}/>
}
