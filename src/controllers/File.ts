import { NextFunction, Request, Response } from "express";
import { FileModel } from "../models/File";
import { File } from "../interfaces/payment";
import path, { extname } from "path";
import fs from 'node:fs';
import { FileDto } from "../dtos/file.dto";


export class FileController {

  static upload = async (req: Request, res: Response, next: NextFunction) => {

    const file = req.file

    if(!file) return res.status(400).json({ error:"No file in request" })

    const docModel = req.body.docModel

    const fileObject: File = {
      name: file.filename,
      originalName: file.originalname,
      ext: extname(file.originalname),
      docModel
    }

    const [error, fileDto] = FileDto.create(fileObject)

    if (error) return res.status(400).json({ error })

    try {
      const fileDB = await FileModel.upload(fileDto)

      return res.json({ file: fileDB })
    } catch (error) {
      next(error)
    }

  }

  static update = async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id
    const body = req.body

    try {

      const fileDB = await FileModel.update(id, body)
      return res.json({ file: fileDB })
    } catch (error) {
      next(error)
    }

  }

  static getALl = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const fileDB = await FileModel.getAll()
      return res.json({ files: fileDB })

    } catch (error) {
      next(error)
    }

  }

  static download = async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;


    try {

      const fileDB = await FileModel.getById(id)

      const filePath = path.join(__dirname, '../uploads/authorized-documents', fileDB.name);
      // res.download(filePath);

      if (!fs.existsSync(filePath)) return res.status(400).json({ msg: 'No se encontro el archvo' })

      const fileStream = fs.createReadStream(filePath);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=example.pdf');

      fileStream.pipe(res);

      res.status(200)


    } catch (error) {
      res.status(500).json({ msg: "Error del server, hable con el admin" })
      next(error)
    }
  }
}