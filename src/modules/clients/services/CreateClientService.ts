import CitiesRepository from '@modules/cities/repositories/CitiesRepository'
import ICreateClientDTO from '../dtos/ICreateClientDTO'
import Client from '../infra/typeorm/entities/Client'
import { IClientRepository } from '../repositories/ClientRepository.ts'

class CreateClientService {
    constructor(
        private clientRepository: IClientRepository,
        private citiesRepository: CitiesRepository
    ) {}

    async execute(data: ICreateClientDTO): Promise<Client> {
        const city = await this.citiesRepository.getCity(data.cityId)
        const newClient = await this.clientRepository.createClient({
            ...data,
            city
        })
        return newClient
    }
}

export default CreateClientService
