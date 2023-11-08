import { Auth } from "../interfaces/auth.interface";
import { IUser, IUserBody } from "../interfaces/user.types";
import { UserModel } from "../models/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

interface LoginProps {
  username: object,
  password: object
}

export const AUTH_HANDLE_ERRORS = {
  NOT_FOUND_USER: 'NOT_FOUND_USER',
  INVALID_PASSWORD: 'INVALID_PASSWORD',
  ALREADY_USER: 'ALREADY_USER'
}

interface TokenResponse {
  token: string;
}

export const loginUser = async (authUser: Auth): Promise<string | TokenResponse> => {

  const { username, password } = authUser


  const user = await UserModel.findOne({ input: { username: username } })

  if (!user) return AUTH_HANDLE_ERRORS['NOT_FOUND_USER']

  const verifyPassword = await bcrypt.compare(password, user.passwordHash!)

  if (!verifyPassword) return AUTH_HANDLE_ERRORS['INVALID_PASSWORD']

  const userForToken = {
    id: user.id,
    username: user.username
  }

  const token = jwt.sign(userForToken, process.env.SEED!, { expiresIn: 60 * 60 })

  return token


}

export const registerUser = async (user: IUserBody) => {

  const { username, password, name, last, branchOffice, rol } = user

  const findUser = await UserModel.findOne({ input: { username } })

  if (findUser) return AUTH_HANDLE_ERRORS.ALREADY_USER

  const passwordHash = await bcrypt.hash(password, 10)


  const newUser = {
    username,
    passwordHash,
    name,
    last,
    branchOffice,
    rol
  }

  const userDB = UserModel.create({ input: newUser })

  return userDB

}