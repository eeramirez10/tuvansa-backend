
import app from './app'
import fs from 'node:fs';
import http from 'node:http';
import https from 'node:https';
import { envs } from './config/envs';

interface Options {
  path: string
  privkey: string
  cert: string
  chain?: string
}


(() => {

  const httpServer = createHttpsServer({
    path: envs.PATH_CERT,
    privkey: envs.PRIVKEY,
    cert: envs.CERT,
    chain: envs.CHAIN
  })

  if (!httpServer) return app.listen(envs.PORT, () => {
    console.log(`Server listen in port ${envs.PORT}`)
  })



})();



function createHttpsServer(options: Options): Boolean {

  const {
    path,
    privkey,
    cert,
    chain,
  } = options;

  const existPathCert = fs.existsSync(path)

  if (!existPathCert) return false

  let privateKey = fs.readFileSync(`${path}/${privkey}`, 'utf8')
  let certificate = fs.readFileSync(`${path}/${cert}`, 'utf8');
  let ca = chain ? fs.readFileSync(`${path}/${chain}`, 'utf8') : '';

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

  return true

}









