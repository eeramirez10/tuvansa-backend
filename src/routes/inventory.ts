import { Router } from 'express'
import { InventoryController } from '../controllers/inventory.controller'
import { validateJWT } from '../middlewares/validateJTW'
export const inventoriesRouter = Router()

inventoriesRouter.use(validateJWT)

inventoriesRouter.get('/', InventoryController.getAll)

inventoriesRouter.post('/', InventoryController.create)

inventoriesRouter.patch('/:id', InventoryController.update)

inventoriesRouter.get('/:id', InventoryController.getById)

inventoriesRouter.get('/iseq/:iseq', InventoryController.getByIseq)

inventoriesRouter.get('/:id', InventoryController.getById)

