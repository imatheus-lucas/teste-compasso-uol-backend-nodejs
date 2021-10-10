import CitiesRepositoryMock from '@modules/cities/repositories/mocks/CitiesRepositoryMock'
import CreateCityService from '@modules/cities/services/CreateCityService'

import ClientRepositoryMock from '../repositories/mock/ClientRepositoryMock'
import CreateClientService from './CreateClientService'

import SearchClientByIdService from './SearchClientByIdService'

let searchClientBuId: SearchClientByIdService

let clientRepository: ClientRepositoryMock
let citiesRepository: CitiesRepositoryMock

let createClientService: CreateClientService
let createCityService: CreateCityService

describe('search client by id service', () => {
    beforeEach(() => {
        citiesRepository = new CitiesRepositoryMock()
        clientRepository = new ClientRepositoryMock()

        createClientService = new CreateClientService(
            clientRepository,
            citiesRepository
        )
        createCityService = new CreateCityService(citiesRepository)

        searchClientBuId = new SearchClientByIdService(clientRepository)
    })
    it('should be able to search client by id', async () => {
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

        const existClient = await searchClientBuId.execute(client.id)

        expect(existClient).toHaveProperty('id')
    })
})
