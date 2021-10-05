import City from '../../infra/typeorm/entities/City'
import ICreateCityDTO from '../../dtos/ICreateCityDTO'
import { uuid } from 'uuidv4'
export interface ICitiesRepository {
    getCities(): Promise<City[]>
    getCity(id: number): Promise<City>
    createCity(data: ICreateCityDTO): Promise<City>
}

class CitiesRepositoryMock implements ICitiesRepository {
    private cities: City[] = []

    public async getCities(): Promise<City[]> {
        return this.cities
    }

    public async getCity(id: number): Promise<City | undefined> {
        const findCities = this.cities.find(
            city => String(city.id) === String(id)
        )

        return findCities
    }
    public async createCity(data: ICreateCityDTO): Promise<City> {
        const city = new City()

        Object.assign(city, { id: uuid() }, data)
        await city.validate()
        this.cities.push(city)

        return city
    }
}
export default CitiesRepositoryMock
