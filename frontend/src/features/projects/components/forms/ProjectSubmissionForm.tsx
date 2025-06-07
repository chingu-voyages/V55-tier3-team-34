"use client"
import React from 'react'
import {INITIAL_VALUES} from "@/features/projects/constants/project-data";
import {
    ProjectSubmissionFormData ,
    projectSubmissionSchema
} from "@/features/projects/schemas/project-submission-schema";
import {ProjectDescriptionSection} from "@/features/projects/components/forms/ProjectDescritionSection";
import {ProjectInfoSection} from "@/features/projects/components/forms/ProjectInfoSection";
import {TeamMembersSection} from "@/features/projects/components/forms/ProjectTeammateSection";
import {TechnologiesSection} from "@/features/projects/components/forms/TechnologySection";
import {FormActions} from "@/features/projects/components/forms/SumbitFormButton";
import useServerAction from "@/hooks/useServerAction";
import {submitProjectAction} from "@/features/projects/api/submit-project";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";


export default function ProjectSubmissionForm() {
    const { runAction, setIsLoading, isLoading } = useServerAction(submitProjectAction);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        watch,
        setValue,
        control,
        trigger
    } = useForm<ProjectSubmissionFormData>({
        resolver: yupResolver(projectSubmissionSchema),
        mode: 'onBlur',
        defaultValues: INITIAL_VALUES
    });

    const values = watch();

    const onSubmit = async (data: ProjectSubmissionFormData) => {
        console.log('received data', data)
        setIsLoading(true);
        const [response, error] = await runAction(data);
        console.log(response, error)
        setIsLoading(false);
        reset();
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Submit Your Project</h1>
                <p className="text-muted-foreground">Share your amazing work with the Chingu community</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <ProjectInfoSection
                    values={values}
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    control={control}
                    trigger={trigger}
                />

                <ProjectDescriptionSection
                    values={values}
                    errors={errors}
                    register={register}
                    control={control}
                    setValue={setValue}
                    trigger={trigger}
                />

                <TeamMembersSection
                    values={values}
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    control={control}
                    trigger={trigger}
                />

                <TechnologiesSection
                    values={values}
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    control={control}
                    trigger={trigger}
                />

                <FormActions isSubmitting={isLoading && isSubmitting} />
            </form>
        </div>
    );
}
