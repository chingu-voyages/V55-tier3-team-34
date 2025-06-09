import React from "react";
import {Search} from "lucide-react";

export const EmptySearchState: React.FC<{ searchTerm: string }> = ({ searchTerm }) => (
    <div className="text-center py-8 text-muted-foreground">
        <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>No technologies found matching for:  {searchTerm}</p>
        <p className="text-sm mt-1">Try a different search term</p>
    </div>
);
