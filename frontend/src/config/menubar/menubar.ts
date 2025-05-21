import { MenubarType} from "@/components/ui/menubar/Menubar";
import {OpacityIcon , PersonIcon} from "@radix-ui/react-icons";
import {navigationPaths} from "@/config/navigation";

export const MENU_ITEMS: MenubarType[] = [
    {
        label: "Explore",
        icon: OpacityIcon,
        href: navigationPaths.projectsPage(),
    },
    {
        label: "Voyagers",
        icon: PersonIcon,
        href: navigationPaths.profilesPage(),
    },
]
