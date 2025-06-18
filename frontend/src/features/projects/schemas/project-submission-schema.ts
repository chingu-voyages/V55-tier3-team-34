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
        .required('Main image URL is required')
        .matches(
            /^https:\/\/.*\.githubusercontent\.com\/.*\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i,
            'Image must be hosted on GitHub (*.githubusercontent.com) with supported format (jpg, jpeg, png, gif, webp, svg)'
        ),
    githubRepo: Yup.string()
        .url('Must be a valid URL')
        .required('GitHub repository URL is required')
        .matches(
            /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+\/?$/,
            'Must be a valid GitHub repository URL (https://github.com/username/repository)'
        )
        .max(100, 'GitHub repo URL must be 100 characters or less'),
    teammates: Yup.array()
        .of(Yup.number().positive())
        .required('Teammates array is required'),
    tags: Yup.array()
        .of(Yup.number().positive())
        .required('Tags array is required')
});

export type ProjectSubmissionFormData = Yup.InferType<typeof projectSubmissionSchema>
