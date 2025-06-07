import React from 'react'
import { Field } from 'formik'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {ProjectSubmissionFormData} from "@/features/projects/schemas/project-submission-schema";
import {Control , FieldErrors} from "react-hook-form";

interface ProjectDescriptionSectionProps {
    values: ProjectSubmissionFormData;
    errors: FieldErrors<ProjectSubmissionFormData>;
    register: any;
    setValue: (field: string, value: any) => void;
    control: Control<ProjectSubmissionFormData>;
}

export const ProjectDescriptionSection: React.FC<ProjectDescriptionSectionProps> = ({
                                                                                        values,
                                                                                        errors,
                                                                                        register
                                                                                    }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Project Description</CardTitle>
                <CardDescription>
                    Tell us about your project in detail
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <div>
                    <Label htmlFor="shortDescription">
                        Short Description * <span className="text-xs text-muted-foreground">(max 250 characters)</span>
                    </Label>
                    <Textarea
                        {...register("shortDescription")}
                        id="shortDescription"
                        placeholder="Brief overview of your project..."
                        maxLength={250}
                        rows={3}
                        className={errors.shortDescription ? "border-red-500" : ""}
                    />
                    {errors.shortDescription && (
                        <p className="text-red-500 text-xs mt-1">{errors.shortDescription.message}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                        {values.shortDescription?.length || 0}/250 characters
                    </p>
                </div>

                <div>
                    <Label htmlFor="longDescription">Detailed Description *</Label>
                    <Textarea
                        {...register("longDescription")}
                        id="longDescription"
                        placeholder="Detailed explanation of your project, its purpose, and implementation..."
                        rows={6}
                        className={errors.longDescription ? "border-red-500" : ""}
                    />
                    {errors.longDescription && (
                        <p className="text-red-500 text-xs mt-1">{errors.longDescription.message}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
