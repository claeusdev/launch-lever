import { readFileSync } from "node:fs"
import { parse } from "yaml"
import { FileParser } from "./FileParser"
import { Toggle } from "./types"

export class YamlParser extends FileParser {
  _yamlFlags: Toggle[] = []
  readFile() {
    const yamlObj = readFileSync("./src/file.yml", "utf8")
    const flags = parse(yamlObj)
    for (let key in flags) {
      this._yamlFlags.push({
        name: key,
        description: flags[key].description[0],
        status: flags[key].status[0]
      }
      )
    }
    return this
  }

  getFlags() {
    return this._yamlFlags
  }
}
