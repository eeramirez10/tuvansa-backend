import { NextFunction, Request, Response } from 'express'
import { UserModel } from '../models/User'
import bcrypt from 'bcrypt'

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

      const newUser = {
        username,
        name,
        last,
        passwordHash,
        branchOffice,
        rol
      }

      const user = await UserModel.create({ input: newUser })

      return res.status(201).json(user)
  
    } catch (error) {

      next(error)
    }
  }
}
