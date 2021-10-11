import request from 'supertest'
import { app } from '@shared/infra/http/app'

import {
    clearTypeOrmConnection,
    createTypeOrmConnection,
    closeTypeOrmConnection
} from '@shared/infra/typeorm'

let cityId: string
beforeAll(async () => {
    await createTypeOrmConnection('test')
    const cityReponse = await request(app).post('/v1/cities').send({
        name: 'São Paulo',
        state: 'SP'
    })

    cityId = cityReponse.body.id
})

afterAll(async () => {
    await clearTypeOrmConnection()
    await closeTypeOrmConnection()
})

describe('clients controller', () => {
    it('should be able to create a new client', async () => {
        const response = await request(app).post('/v1/clients').send({
            name: 'teste',
            genrer: 'M',
            birth_date: '12/04/1978',
            years_old: 20,
            cityId
        })

        expect(response.body).toHaveProperty('id')

        expect(response.body.name).toBe('teste')
    })
    it('should must return client', async () => {
        const client = await request(app).post('/v1/clients').send({
            name: 'teste',
            genrer: 'M',
            birth_date: '12/04/1978',
            years_old: 20,
            cityId
        })

        const response = await request(app).get(`/v1/clients/${client.body.id}`)

        expect(response.body).toHaveProperty('id')

        expect(response.body.name).toBe('teste')
    })
    it('should must return ok deleted client', async () => {
        const client = await request(app).post('/v1/clients').send({
            name: 'teste',
            genrer: 'M',
            birth_date: '12/04/1978',
            years_old: 20,
            cityId
        })

        const response = await request(app).delete(
            `/v1/clients/${client.body.id}`
        )

        expect(response.status).toBe(200)
    })
    it('should must return client updated', async () => {
        const client = await request(app).post('/v1/clients').send({
            name: 'teste',
            genrer: 'M',
            birth_date: '12/04/1978',
            years_old: 20,
            cityId
        })

        const response = await request(app)
            .patch(`/v1/clients/${client.body.id}`)
            .send({
                name: 'teste2'
            })
        console.log(response.body)

        expect(response.status).toBe(200)
        expect(response.body.name).toBe('teste2')
    })
})
