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
}

export interface UserId extends IUser {
  id: string
}

export interface IUserBody extends IUser {
  password: string
}