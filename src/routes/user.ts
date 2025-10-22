import { Router } from 'express'
import { UserController } from '../controllers/User'
import multer from 'multer';
import { validateJWT } from '../middlewares/validateJTW';




const storage = multer.memoryStorage(); // Guardar en memoria para el procesamiento inmediato
const upload = multer({ storage: storage });


export const userRouter = Router()

userRouter.post('/', UserController.create)

userRouter.put('/:id', UserController.update)

userRouter.get('/:id', UserController.getById)

userRouter.get('/', UserController.getList)

// Ruta para manejar la subida del SVG y convertirlo a PNG
userRouter.post('/signature/upload', [validateJWT, upload.single('image')], UserController.uploadSignature);
