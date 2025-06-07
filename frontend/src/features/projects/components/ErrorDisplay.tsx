import React from "react";
import {Alert , AlertDescription} from "@/components/ui/alert";

export const ErrorDisplay: React.FC<{ error: string }> = ({ error }) =>  {
    if(!error) return  null
    return (
        <Alert className="border-destructive">
            <AlertDescription className="text-destructive">
                {error}
            </AlertDescription>
        </Alert>
    );
}
