import React from "react";
import {Search , X} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export const SearchInput: React.FC<{
    value: string;
    onChange: (value: string) => void;
    onClear: () => void;
    onBlur?: () => void;
    onFocus?: () => void;
    placeholder: string;
}> = ({ value, onChange, onClear, placeholder, ...props }) => (
    <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="pl-10 pr-10"
            {...props}
        />
        {value && (
            <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="absolute right-0  top-1/4 -transform-translate-y-1/2 "
            >
                <X className="w-4 h-4" />
            </Button>
        )}
    </div>
);
