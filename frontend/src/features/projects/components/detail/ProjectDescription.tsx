import React from "react";

interface ProjectDescriptionProps {
    description: string;
}

export const ProjectDescription: React.FC<ProjectDescriptionProps> = ({ description }) => {
    const renderDescriptionContent = (text: string) => {
        return text.split('\n').map((paragraph, index) => {
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                    <h3 key={index} className="text-lg font-semibold text-gray-800 mt-6 mb-2">
                        {paragraph.slice(2, -2)}
                    </h3>
                );
            }
            if (paragraph.startsWith('- ')) {
                return (
                    <li key={index} className="text-gray-600 ml-4 mb-1">
                        {paragraph.slice(2)}
                    </li>
                );
            }
            if (paragraph.trim()) {
                return (
                    <p key={index} className="text-gray-600 mb-3 leading-relaxed">
                        {paragraph}
                    </p>
                );
            }
            return null;
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Description</h2>
            <div className="prose prose-gray max-w-none">
                {renderDescriptionContent(description)}
            </div>
        </div>
    );
};
