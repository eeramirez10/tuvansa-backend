import { Router } from 'express'

import { FileController } from '../controllers/File'

import { upload } from '../middlewares/multer2'
import { validateJWT } from '../middlewares/validateJTW'
import path from 'path'
import fs from 'node:fs';
import { FileModel } from '../models/File'



export const FileRouter = Router()

// FileRouter.get('/', FileModel.getAll)
// FileRouter.post('/:paymentId',[validateJWT, multerUpload.array('payments')], FileController.upload)


FileRouter.post('/', [upload.single('file')], FileController.upload)

FileRouter.put('/:id', validateJWT, FileController.update)

FileRouter.get('/', validateJWT, FileController.getALl)

FileRouter.get('/download/:id', FileController.download)





