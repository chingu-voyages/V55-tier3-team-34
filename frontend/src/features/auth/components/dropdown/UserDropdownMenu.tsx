import {
    DropdownMenu ,
    DropdownMenuContent , DropdownMenuItem , DropdownMenuLabel ,
    DropdownMenuSeparator ,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {UserMenu} from "@/features/auth/components/dropdown/UserMenu";
import {AccountInfo} from "@/features/auth/components/dropdown/AccountInfo";
import {MyProfile} from "@/features/auth/components/dropdown/item/MyProfile";
import LogoutButton from "@/features/auth/components/LogoutButton";
import {UserProfile} from "@/types/server-response";









interface UserDropdownMenuProps {
    user: UserProfile
}
export function UserDropdownMenu({user}: UserDropdownMenuProps) {

   return(
       <DropdownMenu>
           <DropdownMenuTrigger>
               <UserMenu user={user} />
           </DropdownMenuTrigger>
           <DropdownMenuContent>
               <DropdownMenuLabel>
                   <AccountInfo user={user} />
               </DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuItem className="w-62  cursor-pointer"  >
                   <MyProfile user={user} />
               </DropdownMenuItem>
               <DropdownMenuItem className="w-62  cursor-pointer"  >
                   <LogoutButton />
               </DropdownMenuItem>
           </DropdownMenuContent>
       </DropdownMenu>
   )
}

