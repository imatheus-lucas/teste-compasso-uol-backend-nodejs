import CitiesRepositoryMock from '@modules/cities/repositories/mocks/CitiesRepositoryMock'
import CreateCityService from '@modules/cities/services/CreateCityService'

import ClientRepositoryMock from '../repositories/mock/ClientRepositoryMock'
import CreateClientService from './CreateClientService'

import UpdateClientNameService from './UpdateClientNameService'

let updateClientNameService: UpdateClientNameService
let clientRepository: ClientRepositoryMock
let createClientService: CreateClientService
let citiesRepository: CitiesRepositoryMock
let createCityService: CreateCityService
describe('update client name service', () => {
    beforeEach(() => {
        citiesRepository = new CitiesRepositoryMock()
        clientRepository = new ClientRepositoryMock()

        createClientService = new CreateClientService(
            clientRepository,
            citiesRepository
        )
        createCityService = new CreateCityService(citiesRepository)

        updateClientNameService = new UpdateClientNameService(clientRepository)
    })
    it('should be able to update client name', async () => {
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

        const updatedClient = await updateClientNameService.execute(
            client.id,
            'Maria'
        )

        expect(updatedClient.name).toBe('Maria')
    })
})
