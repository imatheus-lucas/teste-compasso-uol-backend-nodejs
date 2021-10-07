import 'dotenv/config'
import { createConnection, getConnection, getConnectionOptions } from 'typeorm'

export const createTypeOrmConnection = async (connectionName = 'default') => {
    const connection = await getConnectionOptions(connectionName)

    return createConnection({ ...connection, name: 'default' })
}
export const closeTypeOrmConnection = async () => {
    return await getConnection().close()
}
export const clearTypeOrmConnection = async () => {
    const connection = getConnection()
    const entities = connection.entityMetadatas

    await Promise.all(
        entities.map(async entity => {
            const repository = connection.getRepository(entity.name)
            await repository.query(
                `DROP TABLE IF EXISTS ${entity.tableName} CASCADE`
            )
        })
    )
}
