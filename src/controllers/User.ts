import { NextFunction, Request, Response } from 'express'
import { UserModel } from '../models/User'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose';

import { IUser } from '../interfaces/user.types'
import fs from 'node:fs'
import path from 'path'
import { UserUpdateDto } from '../dtos/user/user-update.dto'
import sharp from 'sharp'


interface ReqExt extends Request {
  userId: string
  user: IUser
}


export class UserController {
  static create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        username,
        name,
        password,
        last,
        branchOffice,
        rol = 'operator'
      } = req.body

      const saltRounds = 10

      const passwordHash = await bcrypt.hash(password, saltRounds)

      const newUser: IUser = {
        username,
        name,
        last,
        passwordHash,
        branchOffice,
        rol,
        pagePermission: [],
        documentsAuthorization: [],
      }

      const user = await UserModel.create({ input: newUser })

      return res.status(201).json(user)

    } catch (error) {

      next(error)
    }
  }

  static update = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body
    const id = req.params.id as unknown as string

    const [error, userUpdateDto] = UserUpdateDto.update({ ...user, id })

    if (error) return res.status(400).json({ error })



    try {
      const updatedUser = await UserModel.update({ id, input: userUpdateDto })

      res.json({ updatedUser })

    } catch (error) {
      res.status(500).json({ error })
    }





  }

  static getById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const user = await UserModel.findById(id)

    if (user === undefined || user === null) {
      return res.status(204).json({
        error: 'User not found'
      })
    }

    res.json({ user })

  }

  static getList = async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserModel.getList()

    return res.json({ users })
  }

  static uploadSignature = async (req: ReqExt, res: Response, next: NextFunction) => {

    const id = new mongoose.Types.ObjectId()
    const idString = id.toString()
    const usuarioId = req.userId

    const user = await UserModel.findById(usuarioId)

    if (!req.file) {
      return res.status(400).send('No se encontró el archivo SVG en la solicitud');
    }

    const outputFilePath = path.join(__dirname, '../uploads/signatures', `${idString}.png`);

    const lastOutputFilePath = path.join(__dirname, '../uploads/signatures', `${user.signature}`);

    sharp(req.file.buffer)
      .png()
      .toFile(outputFilePath, async (err, info) => {
        if (err) {
          console.error('Error al convertir el SVG a PNG:', err);
          return res.status(500).send('Error al convertir el SVG a PNG');
        }

        const fileName = path.basename(outputFilePath)

        try {

          await UserModel.update({ id: usuarioId, input: { signature: fileName } })

          if (user.signature) deleteSignature(lastOutputFilePath)

          res.json({
            message: 'Imagen PNG guardada correctamente',
            fileName,
          });

        } catch (error) {
          next(error)
        }


      });

  }


}

function deleteSignature(outputFilePath: string) {
  if (fs.existsSync(outputFilePath)) fs.unlinkSync(outputFilePath)
}
