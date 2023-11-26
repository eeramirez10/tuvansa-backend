import express, { json } from 'express'
import https from 'node:https'
import http from 'node:http'
import fs from 'node:fs'
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

const existPathCert = fs.existsSync('/etc/letsencrypt/live/tuvansacloud.dyndns.org')
let credentials = {
  key: '',
  cert: '',
  ca: ''
}


if (existPathCert) {
  let privateKey = fs.readFileSync('/etc/letsencrypt/live/tuvansacloud.dyndns.org/privkey.pem', 'utf8')
  let certificate = fs.readFileSync('/etc/letsencrypt/live/tuvansacloud.dyndns.org/cert.pem', 'utf8');
  let ca = fs.readFileSync('/etc/letsencrypt/live/tuvansacloud.dyndns.org/chain.pem', 'utf8');

  credentials = {
    key: privateKey,
    cert: certificate,
    ca
  }

}


app.use(cors())
app.use(json())

app.use(express.static(join(__dirname), { dotfiles: 'allow' }));

app.use('/public', express.static(join(__dirname, '../uploads')))

app.use('/public', express.static(join(__dirname, './uploads')))

app.use('/api/users', userRouter)
app.use('/api/payments', paymentsRouter)
app.use('/api/auth', authRouter)
app.use('/api/files', FileRouter)
app.use('/api/proscai', proscaiRouter)
app.use(handleErrors)

if (existPathCert) {

  const httpServer = http.createServer(app)
  const httpsServer = https.createServer(credentials, app)

  httpServer.listen(80, () => {
    console.log(`Server listen in port 80`)
  })


  httpsServer.listen(443, () => {
    console.log('Server https running on port 443')
  })

} else {

  app.listen(process.env.PORT, () => {
    console.log(`Server listen in port ${process.env.PORT}`)
  })

}


