import { Router } from 'express'
import { validateJWT } from '../middlewares/validateJTW'
import { CompetitionController } from '../controllers/Competition.Controller'

export const competitionRouter = Router()

competitionRouter.get('/', validateJWT, CompetitionController.get)

competitionRouter.get('/:RfcEmisor', validateJWT, CompetitionController.getByRfcEmisor)

competitionRouter.get('/customers/:RfcEmisor', validateJWT, CompetitionController.getCustomersByEmisor)