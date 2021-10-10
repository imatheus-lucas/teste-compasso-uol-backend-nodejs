import CitiesRepository, {
    ICitiesRepository
} from '@modules/cities/repositories/CitiesRepository'
import HttpError from '@shared/errors/HttpError'
import ICreateClientDTO from '../dtos/ICreateClientDTO'
import Client from '../infra/typeorm/entities/Client'
import { IClientRepository } from '../repositories/ClientRepository.ts'

class CreateClientService {
    constructor(
        private clientRepository: IClientRepository,
        private citiesRepository: ICitiesRepository
    ) {}

    async execute(data: ICreateClientDTO): Promise<Client> {
        try {
            const city = await this.citiesRepository.getCityById(data.cityId)
            if (!city) {
                throw new HttpError('City not found', 404)
            }
            const newClient = await this.clientRepository.createClient({
                ...data,
                city
            })
            return newClient
        } catch (err) {
            throw new HttpError(err.message)
        }
    }
}

export default CreateClientService
