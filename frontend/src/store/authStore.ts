import {create} from "zustand/react";
import {User} from "@/types/user";
import {getAuthenticatedUser} from "@/features/auth/api/get-auth-user";

interface AuthState {
    user: User | null
    isLoggedIn: boolean
    setUser: (user: User | null) => void
    fetchUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoggedIn: false,
    setUser: (user) => set({ user, isLoggedIn: !!user }),
    fetchUser: async () => {
        const [data, err] = await getAuthenticatedUser();
        if(data) {
            set({user: data.data, isLoggedIn: true})
        }else {
            set({ user: null, isLoggedIn: false })
        }
    },
}))
