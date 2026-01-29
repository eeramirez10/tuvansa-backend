import { isValidObjectId, ObjectId } from "mongoose"




interface Options {
  id?: string
  name?: string
  originalName?: string
  ext?: string
  doc?: ObjectId
  docModel?: string

}

export class FileUpdateDto {
  public id?: string
  public name?: string
  public originalName?: string
  public ext?: string
  public doc?: ObjectId
  public docModel?: string

  constructor(options: Options) {
    this.id = options.id
    this.name = options.name
    this.originalName = options.originalName
    this.ext = options.ext
    this.doc = options.doc
    this.docModel = options.docModel

  }

  static update(object: Options): [string?, FileUpdateDto?] {

    const {
      id,
      name,
      originalName,
      ext,
      doc,
      docModel,
    } = object

    if (!id) return ['Id is required']

    if (doc) {

      if (!isValidObjectId(doc)) return ['Object Id is not valid']
    }


    return [undefined, new FileUpdateDto(object)]



  }

  values() {
    const object:Options = {}

    if(this.id) object.id = this.id
    if(this.name) object.name = this.name
    if(this.originalName) object.originalName = this.originalName
    if(this.ext) object.ext = this.ext
    if(this.doc) object.doc = this.doc
    if(this.docModel) object.docModel = this.docModel

    return object
  }

}