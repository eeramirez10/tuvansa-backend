import { type Creditor } from '../../interfaces/creditor.interface';
import { creditorSchema } from '../../schemas/creditor';
import {  model } from 'mongoose';
import { connection } from '../../config/mysql';


const Creditor = model<Creditor>('Creditor',creditorSchema) 

export class CreditorModel {
  static getByName = async ({ name }: { name: string }) => {
    const con = await connection()

    const search: string = name.toUpperCase()

    const query = `
    SELECT BSEQ id,BCOD uid,BNOMBRE name FROM FBENC
    WHERE mid(BCOD,1,4)='1107' AND BNOMBRE LIKE '%${search.trim()}%'
    `

    const [creditors] = await con.query(query)

    return creditors

  }

  static create = async ({ input}:{ input: Creditor}) => {

    const { name } = input

    let creditor = await Creditor.findOne({ name })


    if( creditor === null || creditor === undefined){
      const creditor = await Creditor.create({ ...input })

      return creditor

    }

    return creditor

  }
}