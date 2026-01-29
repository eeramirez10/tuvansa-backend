import { isValidObjectId } from "mongoose";
import { File } from "../../interfaces/payment";
import { IUser, UserId } from "../../interfaces/user.types";


interface Options extends UserId { }

export class UserUpdateDto {
  public readonly id: string
  public readonly username: string
  public readonly name: string
  public readonly passwordHash: string
  public readonly last: string
  public readonly branchOffice?: string
  public readonly rol?: string
  public readonly gender?: string
  public readonly pagePermission: string[]
  public readonly documentsAuthorization: string[]
  public readonly signature?: string | null
  public readonly signatureFile?: File

  constructor(options: Options) {
    this.username = options.username
    this.name = options.name
    this.passwordHash = options.passwordHash
    this.last = options.last
    this.branchOffice = options.branchOffice
    this.rol = options.rol
    this.gender = options.gender
    this.pagePermission = options.pagePermission
    this.documentsAuthorization = options.documentsAuthorization
    this.signature = options.signature
    this.signatureFile = options.signatureFile

  }


  static update(object: Options): [string?, UserUpdateDto?] {


    if (!isValidObjectId(object.id)) return ['id is not a valid']
    if (!object.id) return ['id is required']


    return [undefined, new UserUpdateDto({ ...object })]



  }

}