import { fileType } from "./types"

export class FileParser {
  _filename: string = ""
  _type: fileType = "yml"
  constructor(filename: string, type: fileType = "yml") {
    this._filename = filename
    this._type = type
  }
}
