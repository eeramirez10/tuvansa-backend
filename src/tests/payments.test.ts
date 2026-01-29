import request from 'supertest'
import { describe } from 'node:test';
import { loginUser } from '../services/auth';
import app from '../app'
import 'dotenv'
import Response from 'express';



// describe.skip('GET /payments', async () => {
//   test('should respond with a 200 status code', async () => {

//     const { token } = await loginUser({ username: process.env.USERNAME_TO_TESTING, password: process.env.PASSWORD_TO_TESTING })

//     const response = await request(app)
//       .get('/api/payments')
//       .set('Authorization', `bearer ${token}`)
//       .send()

//       expect(response.status).toBe(200)


//   })
// })

describe('POST /payments', async () => {

  const respT = await request(app)
    .post('/api/auth/login')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({
      username: "eeramirez",
      password: "912522Pop"
    })

    console.log(respT.body)



  const body = {
    "category": "Mantenimiento",
    "idProscai": "289381"
  }

  const resp = await request(app)
    .post('/api/payments')
    .set('Authorization', `bearer ${respT.body}`)
    .send()

  console.log(resp.body)
})