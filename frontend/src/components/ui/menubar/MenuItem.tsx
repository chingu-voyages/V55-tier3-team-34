import Link from "next/link";
import React from "react";
import {MenubarType} from "@/components/ui/menubar/Menubar";
import {cn} from "@/utils/cn";

type MenuItemProps = {
    item: MenubarType,
    activeItem: MenubarType['href'],
    onClick: (item: MenubarType['href']) => void
}

export function MenuItem({
                             item,
                             activeItem,
                             onClick
                         }: MenuItemProps) {
    const Icon = item.icon
    const isActive = activeItem == item.href;
    return(
        <Link
            href={item.href}
            className={`w-full ${item.classname}`}
        >
            <button
                onClick={() => onClick(item.href)}
                className={cn("flex w-full  items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer",
                    isActive && "bg-accent text-on-primary hover:bg-opacity-75"
                )}>
                <Icon className="w-5 h-5" />
                <span className="text-base">{item.label}</span>
            </button>
        </Link>
    )
}
