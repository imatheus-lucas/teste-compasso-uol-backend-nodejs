import CitiesRepositoryMock from '@modules/cities/repositories/mocks/CitiesRepositoryMock'
import CreateCityService from '@modules/cities/services/CreateCityService'
import HttpError from '@shared/errors/HttpError'

import ClientRepositoryMock from '../repositories/mock/ClientRepositoryMock'
import CreateClientService from './CreateClientService'
import DeleteClientService from './DeleteClientService'

let deleteClientService: DeleteClientService

let createCityService: CreateCityService
let createClientService: CreateClientService

let citiesRepository: CitiesRepositoryMock
let clientRepository: ClientRepositoryMock
let cityId: string

describe('Delete client service', () => {
    beforeAll(() => {
        citiesRepository = new CitiesRepositoryMock()
        clientRepository = new ClientRepositoryMock()

        createClientService = new CreateClientService(
            clientRepository,
            citiesRepository
        )

        createCityService = new CreateCityService(citiesRepository)

        deleteClientService = new DeleteClientService(clientRepository)
    })
    it('should be able to delete client', async () => {
        const city = await createCityService.execute({
            name: 'São Paulo',
            state: 'SP'
        })

        const client = await createClientService.execute({
            name: 'John doe',
            genrer: 'M',
            birth_date: '12/04/1978',
            years_old: 20,
            cityId: city.id
        })

        const deletedClient = await deleteClientService.execute(client.id)

        expect(deletedClient).toBeTruthy()
    })
    it('should be error in delete client ', async () => {
        await expect(deleteClientService.execute('123')).rejects.toBeInstanceOf(
            HttpError
        )
    })
})
