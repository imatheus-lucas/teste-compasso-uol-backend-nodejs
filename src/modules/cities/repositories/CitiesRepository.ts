import { getRepository, Repository, Like } from 'typeorm'
import ICreateCityDTO from '../dtos/ICreateCityDTO'
import City from '../infra/typeorm/entities/City'
export interface ICitiesRepository {
    getCities(): Promise<City[]>
    getCityById(id: string): Promise<City>
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

    public async getCityById(id: string): Promise<City | undefined> {
        const city = await this.ormRepository.findOne(id)
        return city
    }
    public async createCity(data: ICreateCityDTO): Promise<City> {
        const city = this.ormRepository.create(data)
        await city.validate('error validation city data')
        const newCity = await this.ormRepository.save(data)
        return newCity
    }
    public async findByNameAndState(
        name: string,
        state: string
    ): Promise<City | undefined> {
        //like
        const city = await this.ormRepository.findOne({
            where: [
                {
                    name: Like(`%${name}%`)
                },
                {
                    state: Like(`%${name}%`)
                }
            ]
        })

        return city
    }
}
export default CitiesRepository
