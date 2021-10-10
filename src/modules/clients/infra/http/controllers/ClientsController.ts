import CitiesRepository from '@modules/cities/repositories/CitiesRepository'
import ClientRepository from '@modules/clients/repositories/ClientRepository.ts'
import CreateClientService from '@modules/clients/services/CreateClientService'
import DeleteClientService from '@modules/clients/services/DeleteClientService'
import SearchClientByIdService from '@modules/clients/services/SearchClientByIdService'
import UpdateClientNameService from '@modules/clients/services/UpdateClientNameService'
import { Request, Response } from 'express'

class ClientsController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const clientRepository = new ClientRepository()
        const searchClientByIdService = new SearchClientByIdService(
            clientRepository
        )
        const client = await searchClientByIdService.execute(id)

        return response.json(client)
    }
    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
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
    public async destroy(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { id } = request.params
        const clientRepository = new ClientRepository()
        const deleteClientService = new DeleteClientService(clientRepository)
        await deleteClientService.execute(id)

        return response.status(200).send()
    }
    public async update(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { id } = request.params
        const { name } = request.body

        const clientRepository = new ClientRepository()
        const updateClientNameService = new UpdateClientNameService(
            clientRepository
        )
        const client = await updateClientNameService.execute(id, name)

        return response.json(client)
    }
}
export default new ClientsController()
