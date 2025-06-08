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
                variant={"ghost"}
                onClick={() => onClick(item.href)}
                className={cn("flex items-center justify-start w-full rounded-md cursor-pointer transition-all duration-200 hover:scale-[1.02] group",
                    "text-foreground bg-transparent hover:bg-primary/10 hover:text-primary border-l-2 border-transparent hover:border-l-primary/30",
                    isActive && "bg-primary/15 hover:bg-primary/20 text-primary hover:text-primary border-l-primary shadow-sm"
                )}>
                <Icon className={cn("w-5 h-5 mr-3 transition-all duration-200",
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                )} />
                <span className={cn("text-base font-medium transition-all duration-200",
                    isActive && "font-semibold"
                )}>{item.label}</span>
                {isActive && (
                    <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                )}
            </Button>
        </Link>
    )
}
