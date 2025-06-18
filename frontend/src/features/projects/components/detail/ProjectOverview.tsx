import React from "react";

interface ProjectOverviewProps {
    description: string;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({ description }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Overview</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
};
