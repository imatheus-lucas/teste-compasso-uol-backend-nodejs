import * as Yup from 'yup'

export const CreateClientValidations = Yup.object({
    body: Yup.object({
        name: Yup.string()
            .required('Name is required!')
            .min(3, 'Name must have at least 3 characters!')
            .max(180, 'Name must have a maximum of 180 characters'),
        genrer: Yup.string()
            .required('Genrer is required!')
            .min(1, 'Genrer must have at least 1 characters!')
            .max(1, 'Genrer must have a maximum of 1 characters'),
        birth_date: Yup.date().required('Birth date is required!'),
        years_old: Yup.number()
            .required('Years Old is required!')
            .positive('Years Old must be positive!')
            .integer('Years old must be a integer number!'),
        cityId: Yup.string().required('cityId is required!')
    })
})
