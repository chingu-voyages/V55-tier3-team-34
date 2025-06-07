import { FormikHelpers } from 'formik'
import {ProjectSubmissionFormData} from "@/features/projects/schemas/project-submission-schema";
import useServerAction from "@/hooks/useServerAction";
import {submitProjectAction} from "@/features/projects/api/submit-project";


export const useProjectSubmission = () => {
    const {runAction} = useServerAction(submitProjectAction)
    const handleSubmit = async (
        values: ProjectSubmissionFormData,
        { setSubmitting }: FormikHelpers<ProjectSubmissionFormData>
    ) => {
        console.log('Project submission:', values)
        setSubmitting(true)
        const [response, error] = await runAction(values);
        console.log(response, error)
        setSubmitting(false)
    }
    return {
        handleSubmit
    }
}
