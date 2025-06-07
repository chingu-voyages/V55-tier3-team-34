import React from 'react'

import {FileText } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import {GitHubLogoIcon} from "@radix-ui/react-icons";
import {Control , FieldErrors} from "react-hook-form";
import {ProjectSubmissionFormData} from "@/features/projects/schemas/project-submission-schema";
import {TIERS} from "@/features/projects/constants/project-data";

interface ProjectInfoSectionProps {
    values: ProjectSubmissionFormData;
    errors: FieldErrors<ProjectSubmissionFormData>;
    register: any;
    setValue: (field: string, value: any) => void;
    control: Control<ProjectSubmissionFormData>;
}



export const ProjectInfoSection: React.FC<ProjectInfoSectionProps> = ({
                                                                          values,
                                                                          errors,
                                                                          register,
                                                                          setValue,
                                                                          control
                                                                      }) => {
    return (
        <Card>
        <CardHeader>
            <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Project Information
            </CardTitle>
            <CardDescription>
                Basic details about your project
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="md:col-span-2">
                    <Label htmlFor="title">
                        Project Title * <span className="text-xs text-muted-foreground">(max 150 characters)</span>
                    </Label>
                    <Input
                        {...register('title')}
                        id="title"
                        placeholder="Enter your project title"
                        maxLength={150}
                        className={errors.title ? 'border-red-500' : ''}
                    />
                    {errors.title && (
                        <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                        {values.title?.length || 0}/150 characters
                    </p>
                </div>
                <div>
                    <Label htmlFor="tier">Tier</Label>
                    <Select
                        onValueChange={(value) => setValue('tier', value ? parseInt(value) : null)}
                        value={values.tier?.toString() || ''}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a tier" />
                        </SelectTrigger>
                        <SelectContent>
                            {TIERS.map((tier) => (
                                <SelectItem key={tier.value} value={tier.value.toString()}>
                                    {tier.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.tier && (
                        <p className="text-red-500 text-xs mt-1">{errors.tier.message}</p>
                    )}
                </div>
                <div>
                    <Label htmlFor="voyage">Voyage Number</Label>
                    <Input
                        {...register('voyage', {
                            setValueAs: (value) => value ? parseInt(value) : null,
                        })}
                        id="voyage"
                        type="number"
                        placeholder="e.g., 47"
                        min="1"
                    />
                    {errors.voyage && (
                        <p className="text-red-500 text-xs mt-1">{errors.voyage.message}</p>
                    )}
                </div>

                <div className="md:col-span-2">
                    <Label htmlFor="mainImageUrl">Main Image URL</Label>
                    <Input
                        {...register('mainImageUrl')}
                        id="mainImageUrl"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        className={errors.mainImageUrl ? 'border-red-500' : ''}
                    />
                    {errors.mainImageUrl && (
                        <p className="text-red-500 text-xs mt-1">{errors.mainImageUrl.message}</p>
                    )}
                </div>
                <div className="md:col-span-2">
                    <Label htmlFor="githubRepo">
                        <GitHubLogoIcon className="w-4 h-4 inline mr-1" />
                        GitHub Repository <span className="text-xs text-muted-foreground">(max 100 characters)</span>
                    </Label>
                    <Input
                        {...register('githubRepo')}
                        id="githubRepo"
                        placeholder="username/repository-name"
                        maxLength={100}
                        className={errors.githubRepo ? 'border-red-500' : ''}
                    />
                    {errors.githubRepo && (
                        <p className="text-red-500 text-xs mt-1">{errors.githubRepo.message}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                        {values.githubRepo?.length || 0}/100 characters
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
    )
};
