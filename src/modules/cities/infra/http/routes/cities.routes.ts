import ValidateMiddleware from '@shared/infra/http/middleware/ValidationMiddleware'
import { Router } from 'express'
import CitiesController from '../controllers/CitiesController'
import { CreateCityValidation } from '../validations/CreateCityValidations'

const citiesRoutes = Router()

citiesRoutes.post(
    '/cities',
    ValidateMiddleware(CreateCityValidation),
    CitiesController.create
)
citiesRoutes.get('/cities', CitiesController.show)

export default citiesRoutes
