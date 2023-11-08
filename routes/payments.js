import { Router } from 'express'
import { PaymentController } from '../controllers/Payment.js'

export const paymentsRouter = Router()

paymentsRouter.get('/', PaymentController.getAll)
paymentsRouter.post('/', PaymentController.create)
