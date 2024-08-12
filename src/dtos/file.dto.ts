

const DOC_MODELS = ["Payment", "Remission", "PurchaseOrders",]

export class FileDto {

  private constructor(
    public name: string,
    public originalName: string,
    public ext: string,
    public docModel: string,
  ) { }


  static create = (object: FileDto): [string?, FileDto?] => {

    const {
      name,
      originalName,
      ext,
      docModel
    } = object

    if (!name) return ["Missing name"]
    if (!originalName) return ["Missing originalName"]
    if (!ext) return ["Missing ext"]
    if (!docModel) return ["Missing docModel"]
    if (!DOC_MODELS.includes(docModel)) return ["not a doc model allowed "]

    return [undefined, new FileDto(name, originalName, ext, docModel)]

  }


}