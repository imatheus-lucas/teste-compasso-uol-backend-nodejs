import request from 'supertest'
import { app } from '@shared/infra/http/app'

import {
    clearTypeOrmConnection,
    closeTypeOrmConnection,
    createTypeOrmConnection
} from '@shared/infra/typeorm'

beforeAll(async () => {
    await createTypeOrmConnection('test')
})

afterAll(async () => {
    await clearTypeOrmConnection()
})

describe('Cities Controller', () => {
    it('should be able to create a new user', async () => {
        const response = await request(app).post('/v1/city').send({
            name: 'São Paulo',
            state: 'SP'
        })
        console.log(response.body)
        expect(response.status).toBe(201)
    })
})
