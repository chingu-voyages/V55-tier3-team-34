import {Avatar , AvatarFallback , AvatarImage} from "@/components/ui/avatar";


type UserAvatarProps = {
    classname?: string,
    src: string
}
export function UserAvatar(props: UserAvatarProps) {
    return(
        <Avatar className={`cursor-pointer border-2 border-gray ${props.classname}`} >
            <AvatarImage  src={props.src}></AvatarImage>
            <AvatarFallback>UI</AvatarFallback>
        </Avatar>
    )
}
