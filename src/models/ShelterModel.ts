import { model } from "mongoose"
import { type Shelter } from "../interfaces/shelter.interface"
import { shelterSchema } from "../schemas/shelter"

const Shelter = model<Shelter>('Count', shelterSchema)

export class CountModel {
  static create = async ({ input }: { input: Shelter }) => {

    const count = await Shelter.create(input)

    return count
  }

  static delete = async ({ id }: { id: string }) => {
    const countDB = await Shelter.findByIdAndDelete(id)
    return countDB
  }

}