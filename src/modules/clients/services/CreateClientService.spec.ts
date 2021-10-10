import CitiesRepositoryMock from '@modules/cities/repositories/mocks/CitiesRepositoryMock'
import CreateCityService from '@modules/cities/services/CreateCityService'
import HttpError from '@shared/errors/HttpError'

import ClientRepositoryMock from '../repositories/mock/ClientRepositoryMock'
import CreateClientService from './CreateClientService'

let citiesRepository: CitiesRepositoryMock
let createClientService: CreateClientService
let clientRepository: ClientRepositoryMock
let createCityService: CreateCityService
describe('create client service', () => {
    beforeEach(() => {
        citiesRepository = new CitiesRepositoryMock()
        clientRepository = new ClientRepositoryMock()
        createClientService = new CreateClientService(
            clientRepository,
            citiesRepository
        )
        createCityService = new CreateCityService(citiesRepository)
    })
    it('should be able to create a new client', async () => {
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

        expect(client).toHaveProperty('id')
    })
    it('should validation error occur due to missing data or invalid data', async () => {
        const city = await createCityService.execute({
            name: 'São Paulo',
            state: 'SP'
        })

        await expect(
            createClientService.execute({
                name: 'John doe',
                genrer: 'Masculino',
                birth_date: '12/04/1978',
                years_old: 20,
                cityId: city.id
            })
        ).rejects.toBeInstanceOf(HttpError)
    })
})
