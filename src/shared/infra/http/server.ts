import 'reflect-metadata'
import 'express-async-errors'
import 'dotenv/config'

import { app } from './app'
import { createTypeOrmConnection } from '@config/database'

createTypeOrmConnection()

app.listen(process.env.PORT || 3333, () =>
    console.log('server started in ' + process.env.PORT)
)
