import * as Yup from 'yup'

export const projectSubmissionSchema = Yup.object({
    title: Yup.string()
        .required('Title is required')
        .max(150, 'Title must be 150 characters or less'),
    shortDescription: Yup.string()
        .required('Short description is required')
        .max(250, 'Short description must be 250 characters or less'),
    longDescription: Yup.string()
        .required('Long description is required'),
    tier: Yup.number().nullable().required(),
    voyage: Yup.number().nullable().required(),
    mainImageUrl: Yup.string()
        .url('Must be a valid URL')
        .nullable()
        .required(),
    githubRepo: Yup.string()
        .max(100, 'GitHub repo must be 100 characters or less')
        .nullable()
        .required(),
    teammates: Yup.array()
        .of(Yup.number().positive())
        .required('Teammates array is required'),
    tags: Yup.array()
        .of(Yup.number().positive())
        .required('Tags array is required')
});

export type ProjectSubmissionFormData = Yup.InferType<typeof projectSubmissionSchema>
