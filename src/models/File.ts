import { model } from "mongoose"
import { type File as IFile } from "../interfaces/payment"
import { fileSchema } from "../schemas/file"
import { Request, Response } from "express"
import { getById } from '../services/payment';


export const File = model<IFile>('File', fileSchema)

export class FileModel {
  static upload = async (file: IFile) => {
    const fileDB = await File.create(file)

    return fileDB

  }

  static async update(id: string, file: IFile) {
    const fileDB = await File.findByIdAndUpdate(id, { ...file })
    return fileDB
  }

  static getAll = async () => {
    return File.find({}).populate('doc')
  }

  static getById = async (id: String) => {
    return await File.findById(id)
  }
}