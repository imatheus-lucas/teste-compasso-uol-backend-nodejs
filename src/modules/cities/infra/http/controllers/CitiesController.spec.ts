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

describe('Cities Controller', () => {
    it('should be able to create a new city', async () => {
        const response = await request(app).post('/v1/cities').send({
            name: 'São Paulo',
            state: 'SP'
        })

        expect(response.status).toBe(201)
    })
})
