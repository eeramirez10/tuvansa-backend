import { Router } from "express";
import { CustomerController } from "../../controllers/proscai/Customer";
import { SupplierModel } from "../../models/proscai/Supplier";
import { SupplierController } from "../../controllers/proscai/Sipplier";
import { DoctoController } from "../../controllers/proscai/Docto";
import { ProscaiInventoryController } from '../../controllers/proscai/Inventory';
import { CreditorController } from "../../controllers/proscai/Creditor";

export const proscaiRouter = Router()

proscaiRouter.get('/customers', CustomerController.getAll)

proscaiRouter.get('/suppliers', SupplierController.getByName)

proscaiRouter.get('/creditors', CreditorController.getByName)

proscaiRouter.get('/doctos/:supplierId', DoctoController.getBySupplier)
proscaiRouter.get('/doctos', DoctoController.getAll)
proscaiRouter.get('/doctos/:paymentId/detail', DoctoController.getById)

proscaiRouter.get('/inventories', ProscaiInventoryController.getList)

proscaiRouter.get('/inventories/:iseq', ProscaiInventoryController.getByIseq)

proscaiRouter.get('/inventories/shelter/:almseq', ProscaiInventoryController.getShelter )