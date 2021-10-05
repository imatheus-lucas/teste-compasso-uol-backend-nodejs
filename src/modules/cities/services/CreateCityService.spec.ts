import HttpError from '@shared/errors/HttpError'
import CitiesRepositoryMock from '../repositories/mocks/CitiesRepositoryMock'
import CreateCityService from './CreateCityService'

let citiesRepository: CitiesRepositoryMock
let createCityService: CreateCityService
describe('create city service', () => {
    beforeEach(() => {
        citiesRepository = new CitiesRepositoryMock()
        createCityService = new CreateCityService(citiesRepository)
    })
    it('should be able to create a new city', async () => {
        const city = await createCityService.execute({
            name: 'São Paulo',
            state: 'SP'
        })

        expect(city).toHaveProperty('id')
    })
    it('should validation error occur due to missing data or invalid data', async () => {
        await expect(
            createCityService.execute({
                name: '',
                state: 'MGKJ'
            })
        ).rejects.toBeInstanceOf(HttpError)
    })
})
