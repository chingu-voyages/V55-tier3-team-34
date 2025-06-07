import {MayBe} from "@/utils/type";


export interface User {
    userId: string,
    displayName?: string,
    firstname?: string,
    lastname?: string,
    avatarUrl: MayBe<string>,
    bio: MayBe<string>
    email: string,
    createdAt: string
}

