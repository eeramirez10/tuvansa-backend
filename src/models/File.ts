import { model } from "mongoose"
import { type File as IFile } from "../interfaces/payment"
import { fileSchema } from "../schemas/file"
import { Request, Response } from "express"

export const File = model<IFile>('File', fileSchema)

export class FileModel {
  static upload = async (file: IFile) => {

  
    const fileDB = await File.create(file)

    return fileDB



  }

  static getAll = async (req: Request, res: Response) => {

  }
}