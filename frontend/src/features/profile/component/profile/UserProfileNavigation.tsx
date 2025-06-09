"use client"
import { useSelectedLayoutSegment} from "next/navigation";
import Link from "next/link";
import {cn} from "@/utils/cn";


export function UserProfileNavigation() {
    const segment = useSelectedLayoutSegment('data');
    const navItems = [
        { name: "Projects", href: ``, segment: "projects" },
        { name: "Upvoted Projects", href: "#", segment: "upvoted" },
        { name: "My Comments", href: "#", segment: "comments" },
    ]
    return (
        <nav className="flex gap-2 border-b border-border px-2 sm:px-4 py-2 mb-6">
            {navItems.map((item) => (
                <Link
                    key={item.name}
                    href={item.href}
                    prefetch
                    className={cn(
                        "px-4 py-2 text-sm font-medium  transition-colors hover:",
                        segment === item.segment
                            ? "bg-transparent text-primary  hover:bg-primary/10 text-primary hover:text-primary border-b-1 border-b-primary"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    )}
                >
                    {item.name}
                </Link>
            ))}
        </nav>
    )
}
