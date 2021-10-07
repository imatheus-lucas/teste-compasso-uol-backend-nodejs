import CitiesRepository from '@modules/cities/repositories/CitiesRepository'
import ClientRepository from '@modules/clients/repositories/ClientRepository.ts'
import CreateClientService from '@modules/clients/services/CreateClientService'
import { Request, Response } from 'express'

class ClientsController {
    public async create(request: Request, response: Response): Promise<any> {
        const { name, genrer, birth_date, years_old, cityId } = request.body
        const clientRepository = new ClientRepository()
        const citiesRepository = new CitiesRepository()
        const createClientService = new CreateClientService(
            clientRepository,
            citiesRepository
        )
        const client = await createClientService.execute({
            name,
            genrer,
            birth_date,
            years_old,
            cityId
        })

        return response.json(client)
    }
}
export default new ClientsController()
