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
    it('must be searched by name but returns nothing', async () => {
        const response = await request(app).get(`/v1/cities`).query({
            name: 'Belo Horizonte'
        })

        expect(response.status).toBe(200)
        expect(response.body).toEqual([])
    })
    it('must be searched by state but returns nothing', async () => {
        const response = await request(app).get(`/v1/cities`).query({
            state: 'BH'
        })

        expect(response.status).toBe(200)
        expect(response.body).toEqual([])
    })
    it('should be able search by name', async () => {
        await request(app).post('/v1/cities').send({
            name: 'Belo Horizonte',
            state: 'BH'
        })
        const response = await request(app).get(`/v1/cities`).query({
            name: 'Belo Horizonte'
        })
        expect(response.status).toBe(200)
        expect(response.body[0].name).toBe('Belo Horizonte')
    })
    it('should be able search by state', async () => {
        await request(app).post('/v1/cities').send({
            name: 'Belo Horizonte',
            state: 'MG'
        })
        const response = await request(app).get(`/v1/cities`).query({
            state: 'MG'
        })
        expect(response.status).toBe(200)
        expect(response.body[0].state).toBe('MG')
    })
})
