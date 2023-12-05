import request from 'supertest'
import { conectDB } from '../config/mongo';
import { describe } from 'node:test';
import { type PaymentBody } from '../interfaces/payment';
import { loginUser } from '../services/auth';
import app from '../app'
import 'dotenv'



describe.skip('GET /payments', async () => {
  test('should respond with a 200 status code', async () => {

    const { token } = await loginUser({ username: process.env.USERNAME_TO_TESTING, password: process.env.PASSWORD_TO_TESTING })

    const response = await request(app)
      .get('/api/payments')
      .set('Authorization', `bearer ${token}`)
      .send()

      expect(response.status).toBe(200)
    

  })
})