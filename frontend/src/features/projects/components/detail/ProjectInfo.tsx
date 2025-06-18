import { Calendar } from 'lucide-react';
import React from "react";
import {formatDate} from "@/utils/format";

interface ProjectInfoProps {
    createdAt: string;
    updatedAt?: string;
}

export const ProjectInfo: React.FC<ProjectInfoProps> = ({ createdAt, updatedAt }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                        <p className="text-sm text-gray-500">Created</p>
                        <p className="font-medium text-gray-900">{formatDate(createdAt)}</p>
                    </div>
                </div>
                {updatedAt && (
                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                            <p className="text-sm text-gray-500">Last Updated</p>
                            <p className="font-medium text-gray-900">{formatDate(updatedAt)}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
