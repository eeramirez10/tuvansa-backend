import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';
import { RequestExt } from "../interfaces/request.interface";
import { ObjectId } from "mongoose";


export const validateJWT = (req: any, res: Response, next: NextFunction) => {

  const authorization = req.get('authorization')

  if (!authorization && !authorization?.toLowerCase().startsWith('bearer')) {
    return res.status(403).json({ ok: false, error: 'no hay token en la peticion' })
  }

  const token = authorization.split(' ')[1]

  const decodeToken = jwt.verify(token, process.env.SEED!) as { id: ObjectId, username: string }

  if (!token || !decodeToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const { id, username } = decodeToken

  req.userId = id
  req.username = username

  next()

}