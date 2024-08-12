import { ObjectId } from "mongoose"

export class PurchaseDto {


  public proscai: string
  public provider: string
  public purchaseOrder: string
  public pedPrv: string
  public from: Date
  public due: Date
  public warehouse: string
  public captureDate: Date
  public pcs: string
  public amount: string
  public currency: string
  public exchangeRate: string
  public comment: string
  public authorized: boolean
  public file?: ObjectId
  public signedFile?: ObjectId
  public user?: ObjectId
  public authorizedBy?: ObjectId


  constructor(options: PurchaseDto) {

    this.proscai = options.proscai
    this.provider = options.provider
    this.purchaseOrder = options.purchaseOrder
    this.pedPrv = options.pedPrv
    this.from = options.from
    this.due = options.due
    this.warehouse = options.warehouse
    this.captureDate = options.captureDate
    this.pcs = options.pcs
    this.amount = options.amount
    this.currency = options.currency
    this.exchangeRate = options.exchangeRate
    this.comment = options.comment
    this.authorized = options.authorized
    this.file = options.file
    this.signedFile = options.signedFile
    this.user = options.user
    this.authorizedBy = options.authorizedBy

  }


  static createOrder = (object: PurchaseDto): [string?, PurchaseDto?] => {

    const {
      proscai,
      provider,
      purchaseOrder,
      pedPrv,
      from,
      due,
      warehouse,
      captureDate,
      pcs,
      amount,
      currency,
      exchangeRate,
      comment,
      authorized,
      user
    } = object

    if (!proscai) return ['proscai is required']
    if (!provider) return ['provider is required']
    if (!purchaseOrder) return ['purchaseOrder is required']
    if (!pedPrv) return ['pedPrv is required']
    if (!from) return ['from is required']
    if (!due) return ['due is required']
    if (!warehouse) return ['warehouse is required']
    if (!captureDate) return ['captureDate is required']
    if (!pcs) return ['pcs is required']
    if (!amount) return ['amount is required']
    if (!currency) return ['currency is required']
    if (!exchangeRate) return ['exchangeRate is required']
    if(!user) return ['User is required']


    const purchaseDto = new PurchaseDto({
      proscai,
      provider,
      purchaseOrder,
      pedPrv,
      from,
      due,
      warehouse,
      captureDate,
      pcs,
      amount,
      currency,
      exchangeRate,
      comment: comment ?? '',
      authorized: authorized ?? false,
      user
    })

    console.log(purchaseDto)

    return [undefined, purchaseDto]


  }
}



