
import app from './app'
import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';


const existPathCert = fs.existsSync('/etc/letsencrypt/live/tuvansacloud.dyndns.org')


if (existPathCert) {

  let privateKey = fs.readFileSync('/etc/letsencrypt/live/tuvansacloud.dyndns.org/privkey.pem', 'utf8')
  let certificate = fs.readFileSync('/etc/letsencrypt/live/tuvansacloud.dyndns.org/cert.pem', 'utf8');
  let ca = fs.readFileSync('/etc/letsencrypt/live/tuvansacloud.dyndns.org/chain.pem', 'utf8');

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca
  }

  const httpServer = http.createServer(app)
  const httpsServer = https.createServer(credentials, app)

  httpServer.listen(80, () => {
    console.log(`Server listen in port 80`)
  })


  httpsServer.listen(443, () => {
    console.log('Server https running on port 443')
  })



}

export const server = existPathCert ? app :  app.listen(process.env.PORT, () => {
  console.log(`Server listen in port ${process.env.PORT}`)
})