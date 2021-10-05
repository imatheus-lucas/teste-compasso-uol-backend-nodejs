import * as Yup from 'yup'

export const CreateCityValidation = Yup.object({
    body: Yup.object({
        name: Yup.string()
            .required('Name is required!')
            .min(3, 'Name must have at least 3 characters!')
            .max(180, 'Name must have a maximum of 180 characters'),
        state: Yup.string()
            .required('State is required!')
            .min(2, 'State must have at least 3 characters!')
            .max(3, 'State must have a maximum of 3 characters')
    })
})
