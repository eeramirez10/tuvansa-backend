import { model } from 'mongoose';
import { type Docto } from '../interfaces/docto.interface';
import { doctoSchema } from '../schemas/docto';

const Docto = model('Docto', doctoSchema)
export class DoctoModel {
  static create = async ({ docto }: { docto: Docto }) => {

    const doctoDB = await Docto.create(docto)

    return doctoDB


  }
}