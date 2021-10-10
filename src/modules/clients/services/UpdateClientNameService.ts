import HttpError from '@shared/errors/HttpError'
import Client from '../infra/typeorm/entities/Client'
import { IClientRepository } from '../repositories/ClientRepository.ts'

class UpdateClientNameService {
    constructor(private clientsRepository: IClientRepository) {}
    public async execute(clientId: string, name: string): Promise<Client> {
        const existClient = await this.clientsRepository.getClientById(clientId)
        if (!existClient) {
            throw new HttpError('Client not found', 404)
        }
        const client = await this.clientsRepository.updateClientName(
            clientId,
            name
        )
        return client
    }
}
export default UpdateClientNameService
