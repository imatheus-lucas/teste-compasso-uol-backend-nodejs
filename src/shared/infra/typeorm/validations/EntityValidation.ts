import HttpError from '@shared/errors/HttpError'
import { validate as classValidator } from 'class-validator'

export default abstract class EntityValidation {
    async validate(errorMessage = 'Invalid Data'): Promise<void> {
        const errors = await classValidator(this)

        if (errors.length > 0) {
            throw new HttpError(errorMessage, 400)
        }
    }
}
