import {useAuthStore} from "@/store/authStore";
import useServerAction from "@/hooks/useServerAction";
import {logoutUserAction} from "@/features/auth/api/logout-user";
import {LogOut} from "lucide-react";
import {Button} from "@/components/ui/button";


export const LogoutButton = () => {
    const setUser = useAuthStore(state => state.setUser)
    const { runAction: logout, isLoading } = useServerAction<void, any>(logoutUserAction)

    const handleLogout = async () => {
        try {
            const [data, error] = await logout();
            console.log(data);
            if (error) {
                console.error('Logout failed:', error)
                return
            }
            setUser(null)
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    return (
        <Button
            variant={"ghost"}
            onClick={handleLogout}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 "
        >
            <LogOut className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Logging out...' : 'Logout'}
        </Button>
    )
}

export default LogoutButton
