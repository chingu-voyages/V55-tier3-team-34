"use client"
import React , {useState} from "react";
import {MayBe} from "@/utils/type";
import {IconProps} from "@radix-ui/react-icons/dist/types";
import {MENU_ITEMS} from "@/config/menubar/menubar";
import {usePathname} from "next/navigation";
import {MenuItem} from "@/components/ui/menubar/MenuItem";
import Link from "next/link";
import {navigationPaths} from "@/config/navigation";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "@radix-ui/react-icons";
import {useAuthStore} from "@/store/authStore";


export type MenubarType = {
    icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
    label: string;
    href: string
    classname?: MayBe<string>
}

export function Menubar() {
    const currentPath = usePathname();
    const isLoggedIn = useAuthStore(state => state.isLoggedIn)
    const [activeMenu, setActiveMenu] = useState<MenubarType['href']>(currentPath);
    const onMenuItemClick = (menuLabel: MenubarType['href']) => {
        setActiveMenu(menuLabel)
    }
    return (
        <aside className="w-[16rem]  bg-sidebar-accent border-r-1 border-gray-200">
            <ul className="h-full flex flex-col w-full  px-2">
                <Link
                    className=" py-2 w-full group"
                    href={ isLoggedIn ? navigationPaths.createProject() : navigationPaths.githubLogin() }>
                    <Button
                        variant="default"
                        className="mb-12 w-full flex justify-center items-center bg-gradient-to-r from-primary to-tertiary hover:from-primary/90 hover:to-tertiary/90 text-primary-foreground font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out border-0 relative overflow-hidden group-hover:animate-pulse"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <PlusIcon className="mr-2 h-5 w-5 transition-transform group-hover:rotate-90 duration-300" />
                        <span className="relative z-10 text-lg">Submit a Project</span>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-tertiary rounded-full animate-ping"></div>
                    </Button>
                </Link>
                {MENU_ITEMS.map((item) => {
                    return (
                        <li className="w-full" key={item.label}>
                            <MenuItem
                                item={item}
                                activeItem={activeMenu}
                                onClick={onMenuItemClick}/>
                        </li>
                    )
                })}
            </ul>
        </aside>
    )
}




