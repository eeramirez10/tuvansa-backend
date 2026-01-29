import { ObjectId, model } from "mongoose";
import { type Remission } from '../interfaces/remission';
import { remissionSchema } from "../schemas/remission";


interface RemissionProps {
  proscai?: string
  dateProscai?: string
  remission?: string
  order?: string
  references?: string
  customer?: string
  amount?: string
  agent?: string
  authorized?: boolean
  file?: ObjectId
  user?: ObjectId
  authorizedBy?: ObjectId
}

const Remission = model<Remission>('Remission', remissionSchema)



export class RemissionModel {

  static create(remision: Remission) {

    return Remission.create(remision)

  }

  static getById(id: string) {
    return Remission.findById(id).populate('file').populate('user')
  }

  static getAll() {
    return Remission.find({}).populate('file').populate('user')
  }

  static getOne = async (remision?: RemissionProps) => {
    return await Remission.findOne(remision)
  }

  static update = async (id: string, remision: RemissionProps) => {
    return await Remission.findByIdAndUpdate(id, {...remision}, { new: true })
  }



}