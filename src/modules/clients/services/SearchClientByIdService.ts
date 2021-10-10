import HttpError from '@shared/errors/HttpError'
import Client from '../infra/typeorm/entities/Client'
import { IClientRepository } from '../repositories/ClientRepository.ts'

class SearchClientByIdService {
    constructor(private clientsRepository: IClientRepository) {}
    public async execute(clientId: string): Promise<Client> {
        const client = await this.clientsRepository.getClientById(clientId)
        if (!client) {
            throw new HttpError('Client not found')
        }

        return client
    }
}
export default SearchClientByIdService
