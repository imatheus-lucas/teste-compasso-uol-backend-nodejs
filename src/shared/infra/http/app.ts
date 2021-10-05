import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express'
import HttpError from '@shared/errors/HttpError'
import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof HttpError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        })
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
})

export { app }
