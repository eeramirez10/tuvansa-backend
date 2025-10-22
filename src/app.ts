import express, { json } from 'express'
import cors from 'cors'
import { conectDB } from './config/mongo'
import { handleErrors } from './middlewares/handleErrors'
import { join } from 'path';
import { appRoutes } from './routes/app.routes'
import { proscaiAppRouter } from './routes/proscai/proscaiApp.routes'

const app = express()

conectDB()

app.use(cors())
app.use(json())

app.use(express.static(join(__dirname), { dotfiles: 'allow' }));

app.use('/public', express.static(join(__dirname, '../uploads')))

app.use('/public', express.static(join(__dirname, './uploads')))

//Routes
app.use(appRoutes)
app.use(proscaiAppRouter)



app.use(handleErrors)

export default app;
