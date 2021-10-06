import { Router } from 'express'
import ClientsController from '../controllers/ClientsController'

const clienstRoutes = Router()

clienstRoutes.post('/clients', ClientsController.create)

export default clienstRoutes
