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
const app = express()

conectDB()


app.use(cors())
app.use(json())
app.use('/public', express.static(join(__dirname, '../uploads')))

app.use('/public', express.static(join(__dirname, './uploads')))

app.use('/api/users', userRouter)
app.use('/api/payments', paymentsRouter)
app.use('/api/auth', authRouter)
app.use('/api/files', FileRouter)
app.use('/api/proscai', proscaiRouter)
app.use(handleErrors)

app.listen(process.env.PORT, () => {
  console.log(`Server listen in port ${process.env.PORT}`)
})
