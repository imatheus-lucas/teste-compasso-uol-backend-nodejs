import ValidateMiddleware from '@shared/infra/http/middleware/ValidationMiddleware'
import { Router } from 'express'
import ClientsController from '../controllers/ClientsController'
import { CreateClientValidations } from '../validations/CreateClientValidations'

const clienstRoutes = Router()

clienstRoutes.post(
    '/clients',
    ValidateMiddleware(CreateClientValidations),
    ClientsController.create
)
clienstRoutes.delete('/clients/:id', ClientsController.destroy)
clienstRoutes.patch('/clients/:id', ClientsController.update)
clienstRoutes.get('/clients/:id', ClientsController.show)

export default clienstRoutes
