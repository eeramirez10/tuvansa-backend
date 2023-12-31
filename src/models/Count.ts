import { ObjectId, model } from 'mongoose';
import { Count } from '../interfaces/inventory.interface';
import { countSchema } from '../schemas/count';


const Count = model<Count>('Count', countSchema)

export class CountModel {
  static create = async ({ input }: { input: Count }) => {
    const count = await Count.create(input)

    return count
  }

  static delete = async ({ id }: { id: string }) => {
    const countDB = await Count.findByIdAndDelete(id)
    return countDB
  }

}