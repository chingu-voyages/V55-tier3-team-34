import {Compass} from "lucide-react";

export default function VoyagerBadge() {
    return (
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent text-white  rounded-full text-sm font-medium shadow-sm">
            <Compass className="w-4 h-4" />
        </div>
    );
}
