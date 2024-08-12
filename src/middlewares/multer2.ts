import multer from "multer";
import path, { join } from "path";
import crypto from 'crypto'

const MIMETYPES = ['application/pdf'];

const storage = multer.diskStorage({
  destination: join(__dirname, '../uploads/authorized-documents'),
  filename: function (req, file, cb) {

    if(!file) return cb(new Error("no hay archivo en la peticion"), null)
    const id = crypto.randomUUID()
    cb(null, id + path.extname(file.originalname));
  },
},
)

const fileFilter = (req, file, cb) => {
  if (MIMETYPES.includes(file.mimetype)) cb(null, true);

  else cb(`Only ${MIMETYPES.join(' ')} mimetypes are allowed`);
}

export const upload = multer({ storage, fileFilter })