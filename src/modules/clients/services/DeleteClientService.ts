import HttpError from '@shared/errors/HttpError'
import { IClientRepository } from '../repositories/ClientRepository.ts'

class DeleteClientService {
    constructor(private clientsRepository: IClientRepository) {}
    public async execute(clientId: string): Promise<boolean> {
        const client = await this.clientsRepository.getClientById(clientId)
        if (!client) {
            throw new HttpError('Client not found')
        }
        await this.clientsRepository.deleteClient(client.id)
        return true
    }
}
export default DeleteClientService
