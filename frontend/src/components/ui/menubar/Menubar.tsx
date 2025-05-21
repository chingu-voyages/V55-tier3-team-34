"use client"
import React , {useState} from "react";
import {MayBe} from "@/utils/type";
import {IconProps} from "@radix-ui/react-icons/dist/types";
import {MENU_ITEMS} from "@/config/menubar/menubar";
import {usePathname} from "next/navigation";
import {MenuItem} from "@/components/ui/menubar/MenuItem";
import {ChinguAsyncLogo} from "@/components/ui/logo";


export type MenubarType = {
    icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
    label: string;
    href: string
    classname?: MayBe<string>
}

export function Menubar() {
    const currentPath = usePathname()
    const [activeMenu, setActiveMenu] = useState<MenubarType['href']>(currentPath)
    const onMenuItemClick = (menuLabel: MenubarType['href']) => {
        setActiveMenu(menuLabel)
    }
    return (
        <aside className="w-[16rem]  border-r-1 border-gray-200">
            <div className="p-4 mb-2">
                <ChinguAsyncLogo />
            </div>
            <ul className="h-full flex flex-col w-full  px-2">
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




