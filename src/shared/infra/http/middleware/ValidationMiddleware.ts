import { AnySchema } from 'yup'
import { NextFunction, Request, Response } from 'express'

const ValidateMiddleware =
    (schema: AnySchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate({
                body: req.body,
                query: req.query,
                params: req.params
            })
            return next()
        } catch (err) {
            return res.status(400).json({
                error: err
            })
        }
    }
export default ValidateMiddleware
