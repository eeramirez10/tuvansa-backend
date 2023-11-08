export interface IUser {
  username: string
  name: string
  passwordHash: string
  last: string
  branchOffice?: string
  rol?: string
}

export interface IUserBody extends IUser {
  password: string
}