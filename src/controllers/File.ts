import { NextFunction, Request, Response } from "express";
import { FileModel } from "../models/File";
import { File } from "../interfaces/payment";
import path, { extname } from "path";
import fs from 'node:fs';


export class FileController {

  static upload = async (req: Request, res: Response, next: NextFunction) => {

    const file = req.file

    const fileObject: File = {
      name: file.filename,
      originalName: file.originalname,
      ext: extname(file.originalname),
      docModel: 'Remission',
    }

    try {
      const fileDB = await FileModel.upload(fileObject)

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

      const fileStream = fs.createReadStream(filePath);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=example.pdf');

      fileStream.pipe(res);


    } catch (error) {
      next(error)
    }
  }
}