import HttpError from '@shared/errors/HttpError'
import { getRepository, Repository } from 'typeorm'
import ICreateClientDTO from '../dtos/ICreateClientDTO'
import Client from '../infra/typeorm/entities/Client'

export interface IClientRepository {
    getClients(): Promise<Client[]>
    getClient(id: number): Promise<Client>
    createClient(data: ICreateClientDTO): Promise<Client>
}

class ClientRepository implements IClientRepository {
    private ormRepository: Repository<Client>

    constructor() {
        this.ormRepository = getRepository(Client)
    }

    public async getClients(): Promise<Client[]> {
        const clients = await this.ormRepository.find()
        return clients
    }

    public async getClient(id: number): Promise<Client | undefined> {
        const client = await this.ormRepository.findOne(id)
        return client
    }
    public async createClient(data: ICreateClientDTO): Promise<Client> {
        const client = this.ormRepository.create({
            ...data,
            city: data.city
        })
        await client.validate()
        const newClient = await this.ormRepository.save(data)
        return newClient
    }
}
export default ClientRepository
