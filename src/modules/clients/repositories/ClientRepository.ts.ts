import HttpError from '@shared/errors/HttpError'
import { getRepository, Repository } from 'typeorm'
import ICreateClientDTO from '../dtos/ICreateClientDTO'
import Client from '../infra/typeorm/entities/Client'

export interface IClientRepository {
    getClients(): Promise<Client[]>
    getClientById(id: string): Promise<Client>
    createClient(data: ICreateClientDTO): Promise<Client>
    deleteClient(id: string): Promise<void>
    updateClientName(id: string, name: string): Promise<Client>
}

class ClientRepository implements IClientRepository {
    private ormRepository: Repository<Client>

    constructor() {
        this.ormRepository = getRepository(Client)
    }
    public async deleteClient(id: string): Promise<void> {
        await this.ormRepository.softDelete(id)
    }

    public async getClients(): Promise<Client[]> {
        const clients = await this.ormRepository.find()
        return clients
    }

    public async getClientById(id: string): Promise<Client | undefined> {
        const client = await this.ormRepository.findOne(id)
        return client
    }
    public async createClient(data: ICreateClientDTO): Promise<Client> {
        const client = this.ormRepository.create(data)

        await client.validate()
        const newClient = await this.ormRepository.save(data)
        return newClient
    }
    public async updateClientName(
        id: string,
        name: string
    ): Promise<Client | undefined> {
        const client = await this.ormRepository.findOne(id)
        if (!client) {
            throw new HttpError('Client not found', 404)
        }
        client.name = name
        await client.validate()
        await this.ormRepository.save(client)
        return client
    }
}
export default ClientRepository
