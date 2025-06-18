import React from "react";

interface ProjectImageProps {
    imageUrl: string;
    title: string;
}

export const ProjectImage: React.FC<ProjectImageProps> = ({ imageUrl, title }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-80 object-cover"
            />
        </div>
    );
};
