import {Pencil1Icon} from "@radix-ui/react-icons";


export default function ProfilePage( ) {
    return(
        <div className="w-full p-12 bg-light-background">
            <div className="flex justify-between">
                <h2>Profile</h2>
                <button className="flex items-center gap-2 bg-gray-200 py-2 px-4 rounded-md">
                    Edit Profile
                </button>
            </div>
        </div>
    )
}
