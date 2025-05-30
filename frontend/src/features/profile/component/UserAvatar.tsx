import {Avatar , AvatarFallback , AvatarImage} from "@/components/ui/avatar";


type UserAvatarProps = {
    classname?: string,
    src: string,
    fallback: string,
}
export function UserAvatar(props: UserAvatarProps) {
    return(
        <Avatar className={`cursor-pointer border-2 border-gray ${props.classname}`} >
            <AvatarImage  src={props.src}></AvatarImage>
            <AvatarFallback>{props.fallback}</AvatarFallback>
        </Avatar>
    )
}
