
import express from 'express';
import { userRouter } from './user';
import { paymentsRouter } from './payments';
import { authRouter } from './auth';
import { FileRouter } from './file';
import { inventoriesRouter } from './inventory';
import { countsRouter } from './count';
import { categoryRouter } from './category.controller';
import { proscaiRouter } from './proscai/customers';
import { competitionRouter } from './competition';
import { salesRouter } from './sales';
import { purchasesRouter } from './purchases';



export const appRoutes = express()

appRoutes.use('/api/users', userRouter)
appRoutes.use('/api/payments', paymentsRouter)
appRoutes.use('/api/auth', authRouter)
appRoutes.use('/api/files', FileRouter)
appRoutes.use('/api/inventories', inventoriesRouter)
appRoutes.use('/api/counts', countsRouter)
appRoutes.use('/api/categories', categoryRouter)
appRoutes.use('/api/competitions', competitionRouter)
appRoutes.use('/api/sales', salesRouter)
appRoutes.use('/api/purchases', purchasesRouter)

