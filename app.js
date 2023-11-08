import express, { json } from 'express'
import cors from 'cors'
import { conectDB } from './config/mongo.js'
import { userRouter } from './routes/user.js'
import { handleErrors } from './middlewares/handleErrors.js'
import { paymentsRouter } from './routes/payments.js'

const app = express()

conectDB()

app.use(cors())
app.use(json())

app.use('/api/users', userRouter)
app.use('/api/payments', paymentsRouter)
app.use(handleErrors)

app.listen(process.env.PORT, () => {
  console.log(`Server listen in port ${process.env.PORT}`)
})
