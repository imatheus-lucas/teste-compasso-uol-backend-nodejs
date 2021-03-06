import City from '../../infra/typeorm/entities/City'
import ICreateCityDTO from '../../dtos/ICreateCityDTO'
import { v4 } from 'uuid'
export interface ICitiesRepository {
    getCities(): Promise<City[]>
    getCityById(id: string): Promise<City>
    createCity(data: ICreateCityDTO): Promise<City>
}

class CitiesRepositoryMock implements ICitiesRepository {
    private cities: City[] = []

    public async getCities(): Promise<City[]> {
        return this.cities
    }

    public async getCityById(id: string): Promise<City | undefined> {
        const findCities = this.cities.find(
            city => String(city.id) === String(id)
        )

        return findCities
    }
    public async createCity(data: ICreateCityDTO): Promise<City> {
        const city = new City()

        Object.assign(city, { id: v4() }, data)
        await city.validate('error in validate city data')
        this.cities.push(city)

        return city
    }
}
export default CitiesRepositoryMock
