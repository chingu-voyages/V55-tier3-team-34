import {
    DropdownMenu ,
    DropdownMenuContent , DropdownMenuItem , DropdownMenuLabel ,
    DropdownMenuSeparator ,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {UserMenu} from "@/features/profile/component/dropdown/UserMenu";
import {AccountInfo} from "@/features/profile/component/dropdown/AccountInfo";
import {MyProfile} from "@/features/profile/component/dropdown/item/MyProfile";
import Link from "next/link";
import {envVars} from "@/config/env";








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
               <DropdownMenuItem className="w-62  cursor-pointer" asChild >
                   <MyProfile />
               </DropdownMenuItem>
               <DropdownMenuItem className="w-62  cursor-pointer" asChild >
                   <Link href={`${envVars.API_URL}/auth/github`}>
                         Login
                   </Link>
               </DropdownMenuItem>
           </DropdownMenuContent>
       </DropdownMenu>
   )
}

