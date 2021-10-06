import citiesRoutes from '@modules/cities/infra/http/routes/cities.routes'
import clienstRoutes from '@modules/clients/infra/http/routes/clients.routes'
import { Router } from 'express'

const routes = Router()

routes.use('/v1', [citiesRoutes, clienstRoutes])

export default routes
