import {Card , CardContent} from "@/components/ui/card";
import {Avatar , AvatarFallback , AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const users = [
    {
        id: 1,
        name: "Amelia Hart",
        role: "Astronomer",
        imageUrl: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
        id: 2,
        name: "Leo Armstrong",
        imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        id: 3,
        name: "Nova Chen",
        imageUrl: "https://randomuser.me/api/portraits/women/88.jpg",
    },
    {
        id: 4,
        name: "Orion Vega",
        imageUrl: "https://randomuser.me/api/portraits/men/55.jpg",
    },
];

export default function VoyagerList() {
    return (
        <div className="w-full p-4 ">
            <h2 className="text-xl font-bold">Voyagers</h2>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {users.map((user) => (
                    <Card key={user.id} className="rounded-2xl  hover:shadow-sm transition-shadow">
                        <CardContent className="flex flex-col items-center p-6">
                            <Avatar className="w-24 h-24 mb-4">
                                <AvatarImage src={user.imageUrl} alt={user.name} />
                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <h3 className="text-lg font-semibold text-center">{user.name}</h3>
                            <Link className="w-full" href="/profiles/3">
                                <Button variant="primary" className="w-full cursor-pointer">View Profile</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
