import express, { json } from 'express'
import cors from 'cors'
import 'dotenv/config'
import { userRouter } from './routes/user'
import { conectDB } from './config/mongo'
import { handleErrors } from './middlewares/handleErrors'
import { paymentsRouter } from './routes/payments'
import { authRouter } from './routes/auth'
import { FileRouter } from './routes/file'
import { join } from 'path';
import { proscaiRouter } from './routes/proscai/customers'
import { inventoriesRouter } from './routes/inventory'
import { countsRouter } from './routes/count'
import { categoryRouter } from './routes/category.controller'
import { competitionRouter } from './routes/competition'
const app = express()

conectDB()

app.use(cors())
app.use(json())

app.use(express.static(join(__dirname), { dotfiles: 'allow' }));

app.use('/public', express.static(join(__dirname, '../uploads')))

app.use('/public', express.static(join(__dirname, './uploads')))

app.use('/api/users', userRouter)
app.use('/api/payments', paymentsRouter)
app.use('/api/auth', authRouter)
app.use('/api/files', FileRouter)
app.use('/api/inventories', inventoriesRouter)
app.use('/api/counts', countsRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/proscai', proscaiRouter)
app.use('/api/competitions', competitionRouter)
app.use(handleErrors)

export default app;
