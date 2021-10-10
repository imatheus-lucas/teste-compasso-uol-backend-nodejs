import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO'
import Client from '@modules/clients/infra/typeorm/entities/Client'
import { v4 } from 'uuid'

export interface IClientRepository {
    getClientById(id: string): Promise<Client>
    createClient(data: ICreateClientDTO): Promise<Client>
    deleteClient(id: string): Promise<void>
    updateClientName(id: string, name: string): Promise<Client>
}

class ClientRepositoryMock implements IClientRepository {
    private clients: Client[] = []

    async getClientById(id: string): Promise<Client> {
        const findClients = this.clients.find(
            client => String(client.id) === String(id)
        )

        return findClients
    }
    async createClient(data: ICreateClientDTO): Promise<Client> {
        const client = new Client()

        Object.assign(client, { id: v4() }, data)
        await client.validate('error in validate client data')
        this.clients.push(client)

        return client
    }
    async deleteClient(id: string): Promise<void> {
        this.clients.filter(client => String(client.id) !== String(id))
    }
    async updateClientName(id: string, name: string): Promise<Client> {
        const client = this.clients.find(
            client => String(client.id) === String(id)
        )

        Object.assign(client, { name })

        return client
    }
}
export default ClientRepositoryMock
