import request from 'supertest'
import { app } from '@shared/infra/http/app'

import {
    clearTypeOrmConnection,
    createTypeOrmConnection
} from '@shared/infra/typeorm'

beforeAll(async () => {
    await createTypeOrmConnection('test')
})

afterAll(async () => {
    await clearTypeOrmConnection()
})

describe('clients controller', () => {
    it('should be able to create a new client', async () => {
        const cityReponse = await request(app).post('/v1/cities').send({
            name: 'São Paulo',
            state: 'SP'
        })
        let cityId = cityReponse.body.id
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
})
