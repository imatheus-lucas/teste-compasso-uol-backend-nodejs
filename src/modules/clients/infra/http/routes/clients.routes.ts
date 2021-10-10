import { Router } from 'express'
import ClientsController from '../controllers/ClientsController'

const clienstRoutes = Router()

clienstRoutes.post('/clients', ClientsController.create)
clienstRoutes.delete('/clients/:id', ClientsController.destroy)
clienstRoutes.patch('/clients/:id', ClientsController.update)
clienstRoutes.get('/clients/:id', ClientsController.show)
export default clienstRoutes
