import { Request } from "express"
import { type JwtPayload } from "jsonwebtoken"
import { ObjectId } from "mongoose"

export interface RequestExt extends Request {
  userId: JwtPayload | ObjectId
  username: JwtPayload | string
}
