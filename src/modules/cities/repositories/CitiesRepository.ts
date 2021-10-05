import HttpError from '@shared/errors/HttpError'
import { getRepository, Repository } from 'typeorm'
import ICreateCityDTO from '../dtos/ICreateCityDTO'
import City from '../infra/typeorm/entities/City'
export interface ICitiesRepository {
    getCities(): Promise<City[]>
    getCity(id: number): Promise<City>
    createCity(data: ICreateCityDTO): Promise<City>
}

class CitiesRepository implements ICitiesRepository {
    private ormRepository: Repository<City>

    constructor() {
        this.ormRepository = getRepository(City)
    }

    public async getCities(): Promise<City[]> {
        const cities = await this.ormRepository.find()
        return cities
    }

    public async getCity(id: number): Promise<City | undefined> {
        const city = await this.ormRepository.findOne(id)
        return city
    }
    public async createCity(data: ICreateCityDTO): Promise<City> {
        const city = this.ormRepository.create(data)
        await city.validate()
        const newCity = await this.ormRepository.save(data)
        return newCity
    }
}
export default CitiesRepository
