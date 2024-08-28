
import multer from 'multer';
import { extname, join } from 'path';
import { type File as IFile } from '../interfaces/payment';
import { FileModel } from '../models/File';
import { PaymentModel } from '../models/Payment';

const MIMETYPES = ['application/pdf'];

export const multerUpload = multer({
  storage: multer.diskStorage({
    destination: join(__dirname, '../uploads'),
    filename: async (req: any, file, cb) => {
      const fileExtension = extname(file.originalname);
      const fileName = file.originalname.split(fileExtension)[0];

      const { paymentId } = req.params
      const newFile: IFile = {
        name: fileName,
        ext: fileExtension,
        // payment: paymentId
        originalName: '',
        docModel: ''
      }

      const fileDB = await FileModel.upload(newFile)

      await PaymentModel.addFiles({paymentId, file: fileDB.id})

      cb(null, `${fileDB.id}${fileExtension}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (MIMETYPES.includes(file.mimetype)) cb(null, true);
    
    else cb(new Error(`Only ${MIMETYPES.join(' ')} mimetypes are allowed`));
  },
  limits: {
    fieldSize: 10000000,
  },
})