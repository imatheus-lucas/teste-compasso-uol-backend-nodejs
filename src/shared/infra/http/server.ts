import 'reflect-metadata'
import 'express-async-errors'
import 'dotenv/config'
import { app } from './app'

app.listen(process.env.PORT || 3333, () => console.log('Server running'))
