import ICreateCityDTO from '../dtos/ICreateCityDTO'
import City from '../infra/typeorm/entities/City'
import { ICitiesRepository } from '../repositories/CitiesRepository'

class CreateCityService {
    constructor(private cityRepository: ICitiesRepository) {}

    async execute(city: ICreateCityDTO): Promise<City> {
        const newCity = await this.cityRepository.createCity(city)
        return newCity
    }
}

export default CreateCityService
