import {UserProfile} from "@/types/server-response";

export function getDisplayName(user: UserProfile) {
    if (user?.displayName) return user.displayName;
    if (user?.firstname && user?.lastname) {
        return `${user.firstname} ${user.lastname}`;
    }
    if (user?.firstname) return user.firstname;
    return 'Anonymous Voyager';
}

export function getAvatarFallback(user:UserProfile) {
    const name = getDisplayName(user);
    return name.charAt(0).toUpperCase();
}
