import {
    DropdownMenu ,
    DropdownMenuContent , DropdownMenuItem , DropdownMenuLabel ,
    DropdownMenuSeparator ,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {UserMenu} from "@/features/auth/components/dropdown/UserMenu";
import {AccountInfo} from "@/features/auth/components/dropdown/AccountInfo";
import {MyProfile} from "@/features/auth/components/dropdown/item/MyProfile";
import {GithubLoginButton} from "@/features/auth/components/GithubLoginButton";








export function UserDropdownMenu() {
   return(
       <DropdownMenu>
           <DropdownMenuTrigger>
               <UserMenu />
           </DropdownMenuTrigger>
           <DropdownMenuContent>
               <DropdownMenuLabel>
                   <AccountInfo />
               </DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuItem className="w-62  cursor-pointer"  >
                   <MyProfile />
               </DropdownMenuItem>
               <DropdownMenuItem className="w-62  cursor-pointer"  >
                   <GithubLoginButton />
               </DropdownMenuItem>
           </DropdownMenuContent>
       </DropdownMenu>
   )
}

