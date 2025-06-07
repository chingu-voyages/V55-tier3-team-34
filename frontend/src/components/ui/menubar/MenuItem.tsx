import Link from "next/link";
import React from "react";
import {MenubarType} from "@/components/ui/menubar/Menubar";
import {cn} from "@/utils/cn";
import {Button} from "@/components/ui/button";

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
            prefetch
        >
            <Button
                variant={"primary"}
                onClick={() => onClick(item.href)}
                className={cn("flex items-center text-foreground bg-transparent hover:bg-gray-200 hover:text-accent justify-start w-full  rounded-md cursor-pointer",
                    isActive && "bg-accent hover:bg-accent/90 text-accent-foreground hover:text-accent-foreground"
                )}>
                <Icon className="w-5 h-5" />
                <span className="text-base">{item.label}</span>
            </Button>
        </Link>
    )
}
