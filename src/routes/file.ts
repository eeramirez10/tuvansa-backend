import { Router } from 'express'
import { FileModel } from '../models/File'
import { multerUpload } from '../middlewares/multer'
import { FileController } from '../controllers/File'
import { validateJWT } from '../middlewares/validateJTW'

export const FileRouter = Router()

// FileRouter.get('/', FileModel.getAll)
FileRouter.post('/:paymentId',[validateJWT, multerUpload.array('payments')], FileController.upload)