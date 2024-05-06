import { ObjectId } from "mongoose";
import { PaymentModel } from "../models/Payment"
import { SupplierModel } from "../models/SupplierModel"
import { DoctoProscaiModel } from '../models/proscai/Docto';
import { IPayment, PaymentId, Supplier } from '../interfaces/payment';
import { Creditor } from "../interfaces/creditor.interface";
import { CreditorModel } from "../models/proscai/Creditor";
import { BranchOffice } from '../interfaces/inventory.interface';
import { DoctoModel } from "../models/Docto";

interface PaymentResponse {
  payment?: PaymentId,
  error?: string
}

interface PaymentInput {
  subcategory: ObjectId
  idProscai: string | null
  category: ObjectId
  supplier?: Supplier | null
  creditor?: Creditor | null
  branchOffice: BranchOffice
  coin: {
    name: string
    code: string
  }
  amount: number
  datePaid: Date
  userId: ObjectId
}


export const getById = () => {

}

export const updatePayment = async ({ input, id }: { input: PaymentInput, id: string }): Promise<PaymentResponse> => {

  const {
    idProscai,
    category,
    supplier,
    creditor,
    coin,
    amount,
    datePaid,
    branchOffice,
    userId,
    subcategory
  } = input

  const doctoProscaiDB = idProscai === null ? idProscai : await DoctoProscaiModel.getById({ id: idProscai })

  let doctoDb;

  if (idProscai !== null) {
    doctoDb = await DoctoModel.findOne({ idProscai })

    if (!doctoDb) {
      doctoDb = await DoctoModel.create({ docto: doctoProscaiDB })
    }
  }

  const supplierDB = supplier === null ? supplier : (await SupplierModel.create({ input: supplier }))

  const creditorDB = creditor === null ? creditor : (await CreditorModel.create({ input: creditor }))

  const newPayment: IPayment = {
    supplier: supplierDB === null ? null : supplierDB.id,
    creditor: creditorDB === null ? null : creditorDB.id,
    category,
    coin,
    amount,
    datePaid,
    subcategory,
    branchOffice,
    proscai: idProscai === null ? idProscai : doctoDb['id'],
    user: userId
  }

  const paymentDB = await PaymentModel.update({ id, input: newPayment })

  return { payment: paymentDB }

}


export const createNewPayment = async (input: PaymentInput): Promise<PaymentResponse> => {

  const {
    idProscai,
    category,
    supplier,
    creditor,
    coin,
    amount,
    datePaid,
    branchOffice,
    userId,
    subcategory
  } = input

  const doctoProscaiDB = idProscai === null ? idProscai : await DoctoProscaiModel.getById({ id: idProscai })

  let doctoDb;

  if (idProscai !== null) {
    doctoDb = await DoctoModel.findOne({ idProscai })

    if (!doctoDb) {
      doctoDb = await DoctoModel.create({ docto: doctoProscaiDB })
    }
  }

  const supplierDB = supplier === null ? supplier : (await SupplierModel.create({ input: supplier }))

  const creditorDB = creditor === null ? creditor : (await CreditorModel.create({ input: creditor }))

  console.log(subcategory)

  const newPayment: IPayment = {
    supplier: supplierDB === null ? null : supplierDB.id,
    creditor: creditorDB === null ? null : creditorDB.id,
    category,
    subcategory: subcategory ?? null,
    coin,
    amount,
    datePaid,
    branchOffice,
    proscai: idProscai === null ? idProscai : doctoDb['id'],
    user: userId
  }

  const paymentDB = await PaymentModel.create({ input: newPayment })

  return { payment: paymentDB }
}







export const createPaymentFromProscai = async ({ idProscai, category, userId }: { idProscai: string, category: string, userId: ObjectId }) => {


  const doctoExist = await DoctoProscaiModel


  let paymentExist = await PaymentModel.findOne({ input: idProscai })

  if (paymentExist) return { error: "payment is in DB" }

  console.log({ paymentExist })

  let paymentDB = await DoctoProscaiModel.getById({ id: idProscai })

  console.log({ paymentDB })

  const supplierDB = await SupplierModel.create({ input: paymentDB.supplier })

  console.log({ supplierDB })

  const newPayment = {
    ...paymentDB,
    supplier: supplierDB.id,
    category,
    user: userId
  }

  paymentDB = await PaymentModel.create({ input: newPayment })

  return { payment: paymentDB }
}