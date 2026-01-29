import express from 'express';
import { purchasesRouter } from './purchases';
import { proscaiRouter } from './customers';
import { proscaiSalesRouter } from './sales';


export const proscaiAppRouter = express.Router()


proscaiAppRouter.use('/api/proscai', purchasesRouter)
proscaiAppRouter.use('/api/proscai', proscaiRouter)
proscaiAppRouter.use('/api/proscai', proscaiSalesRouter)