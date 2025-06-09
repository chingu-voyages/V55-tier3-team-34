import React from "react";
import {Search , X} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    onClear: () => void;
    onBlur?: () => void;
    onFocus?: () => void;
    placeholder: string;
    className?: string;
    disabled?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
                                                            value,
                                                            onChange,
                                                            onClear,
                                                            placeholder,
                                                            className = "",
                                                            disabled = false,
                                                            ...props
                                                        }) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape' && value) {
            onClear();
        }
    };

    return (
        <div className={`relative group ${className}`}>
            <Search className={`
                absolute left-3 top-1/2 transform -translate-y-1/2 
                w-4 h-4 transition-colors duration-200
                ${value ? 'text-gray-500' : 'text-gray-400'}
                ${disabled ? 'text-gray-300' : ''}
            `} />
            <Input
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                className={`
                    pl-10 pr-10 h-10
                    border-gray-200 bg-white
                `}
                {...props}
            />
            {value && !disabled && (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClear}
                    aria-label="Clear search"
                    className={`
                        absolute right-1 top-7 transform -translate-y-1/2
                        ${value ? 'opacity-70' : ''}
                    `}
                >
                    <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                </Button>
            )}

        </div>
    );
};
