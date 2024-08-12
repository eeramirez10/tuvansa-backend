import express from 'express';
import { purchasesRouter } from './purchases';
import { proscaiRouter } from './customers';


export const proscaiAppRouter = express.Router()


proscaiAppRouter.use('/api/proscai', purchasesRouter)
proscaiAppRouter.use('/api/proscai', proscaiRouter)