import request from 'supertest'
import { app } from '@shared/infra/http/app'

import {
    clearTypeOrmConnection,
    createTypeOrmConnection,
    closeTypeOrmConnection
} from '@shared/infra/typeorm'

beforeAll(async () => {
    await createTypeOrmConnection('test')
    await request(app).post('/v1/cities').send({
        name: 'São Paulo',
        state: 'SP'
    })
})

afterAll(async () => {
    await clearTypeOrmConnection()
    await closeTypeOrmConnection()
})

describe('Cities Controller', () => {
    it('should be able to create a new city', async () => {
        const response = await request(app).post('/v1/cities').send({
            name: 'Belo Horizonte',
            state: 'BH'
        })

        expect(response.status).toBe(201)
    })
    it('should must be searched by name', async () => {
        const response = await request(app).get(`/v1/cities`).query({
            name: 'São Paulo'
        })

        expect(response.status).toBe(200)
    })
    it('should must be searched by state', async () => {
        const response = await request(app).get(`/v1/cities`).query({
            name: 'SP'
        })

        expect(response.status).toBe(200)
    })
    it('should must be searched without any query string', async () => {
        const response = await request(app).get(`/v1/cities`)

        expect(response.status).toBe(200)
    })
})
