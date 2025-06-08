import {getVoyagers} from "@/features/profile/api/get-voyagers";
import {VoyagerCard} from "@/features/profile/component/voyager/VoyagerCard";
import React from "react";


export async function VoyagerGrid() {
    const [response, error] = await  getVoyagers();
    const users = response?.data ?? []
    if(error) {
        throw error
    }
    return (
        <div className="w-full p-6 ">
            <div className="py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {users.map((user) => (
                    <VoyagerCard key={user.userId} user={user} />
                ))}
            </div>
        </div>
    );
}
