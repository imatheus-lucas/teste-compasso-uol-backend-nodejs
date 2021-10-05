import CitiesRepository from '@modules/cities/repositories/CitiesRepository'
import CreateCityService from '@modules/cities/services/CreateCityService'

import { Request, Response } from 'express'
class CitiesController {
    public async create(request: Request, response: Response) {
        const { name, state } = request.body
        const cityRepository = new CitiesRepository()
        const cityService = new CreateCityService(cityRepository)

        const city = await cityService.execute({
            name,
            state
        })

        return response.status(201).json(city)
    }
}

export default new CitiesController()
