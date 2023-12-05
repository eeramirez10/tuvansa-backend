import { SupplierModel } from "../models/SupplierModel";
import { loginUser } from "../services/auth";
import { Supplier } from '../interfaces/payment';
import { conectDB } from "../config/mongo";

conectDB()


let token;



describe('sipplier /post', () => {

  // beforeEach(async () => {
  //   const resp = await loginUser({ username: process.env.USERNAME_TO_TESTING, password: process.env.PASSWORD_TO_TESTING })

  //   token = resp.token


  // })

  test('should create a new supplier if dont exists', async () => {

    await SupplierModel.deleteAll()


    const newSupplier: Supplier = {
      idProscai: '123',
      name: 'Gunderson'
    }

    await SupplierModel.create({ input: newSupplier })

    const suppliers = await SupplierModel.getAll()

    const suppierIdProscai = suppliers.map((supplier) => supplier.idProscai)

    expect(suppierIdProscai).toContain('123')

  })

  test('should not create a new supplier if exist', async () => {
    const newSupplier: Supplier = {
      idProscai: '123',
      name: 'Gunderson'
    }

    await SupplierModel.create({ input: newSupplier })

    const suppliers = await SupplierModel.find({ input: { idProscai: newSupplier.idProscai } })

    expect(suppliers).toHaveLength(1)

  })


})