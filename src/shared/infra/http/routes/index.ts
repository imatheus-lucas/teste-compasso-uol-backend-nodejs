import citiesRoutes from '@modules/cities/infra/http/routes/cities.routes'
import { Router } from 'express'

const routes = Router()

routes.use('/v1', citiesRoutes)

export default routes
