import { File } from "./payment"

export interface IUser {
  username: string
  name: string
  passwordHash: string
  last: string
  branchOffice?: string
  rol?: string
  gender?: string
  pagePermission: string[]
  documentsAuthorization: string[]
  signature?: string | null
  signatureFile?: File
}

export interface UpdateUser {
  id?: string
  username?: string
  name?: string
  passwordHash?: string
  last?: string
  branchOffice?: string
  rol?: string
  gender?: string
  pagePermission?: string[]
  documentsAuthorization?: string[]
  signature?: string | null
  signatureFile?: File

}

export interface UserId extends IUser {
  id: string
}

export interface IUserBody extends IUser {
  password: string
}