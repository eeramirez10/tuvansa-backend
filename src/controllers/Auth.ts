import { Request, Response, NextFunction } from "express";
import { AUTH_HANDLE_ERRORS, loginUser, registerUser } from "../services/auth";
import { IUserBody } from "../interfaces/user.types";
import jwt from 'jsonwebtoken';
import { RequestExt } from "../interfaces/request.interface";

export class AuthController {
  static login = async ({ body }: Request, res: Response, next: NextFunction) => {

    const { username, password } = body

    try {

      const userLoginResponse = await loginUser({ username, password })

      if (userLoginResponse.error) {

        if (userLoginResponse.error === AUTH_HANDLE_ERRORS.NOT_FOUND_USER) {
          return res.status(409).json({ error: 'User or password invalid' })
        }

        if (userLoginResponse.error === AUTH_HANDLE_ERRORS.INVALID_PASSWORD) {
          return res.status(409).json({ error: 'User or password invalid' })
        }

      }

      const { token, user } = userLoginResponse


      return res.json({
        user,
        token
      })

    } catch (error) {
      next(error)
    }



  }

  static register = async ({ body }: Request, res: Response, next: NextFunction) => {


    const user: IUserBody = {
      ...body,
      rol: body.rol || ''
    }

    try {
      const newUser = await registerUser(user)

      if (newUser === AUTH_HANDLE_ERRORS.ALREADY_USER) return res.status(400).json({ error: `Alredy user ${user.username} in DB` })

      return res.json(newUser)

    } catch (error) {
      next(error)
    }



  }

  static revalidarToken = async (req: any, res: Response, next: NextFunction) => {

    const { userId, username } = req


    const token = jwt.sign({ id: userId, username }, process.env.SEED!, { expiresIn: 60 * 60 })

    res.json({
      user: {
        id: userId,
        username
      },
      token
    })

  }
}