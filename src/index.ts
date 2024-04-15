import { readFileSync } from "node:fs"
import { parse } from "yaml"
import { Toggle, ToggleStatus, ToggleStatuses } from "./types";

export function isOn(status: ToggleStatus): boolean {
  return status === "on";
}

type fileType = "yml" | "json"

class FileParser {
  _filename: string = ""
  _type: fileType = "yml"
  constructor(filename: string, type: fileType = "yml") {
    this._filename = filename
    this._type = type
  }
}


class YamlParser extends FileParser {
  _yamlFlags = {}
  readFile() {
    const yamlObj = readFileSync("./src/file.yml", "utf8")
    this._yamlFlags = yamlObj
    console.log({ yamlObj })
    return this
  }

  getFlags() {
    return this._yamlFlags
  }
}

const yamlFlags = new YamlParser("file.yml").readFile()

console.log(yamlFlags.getFlags())

export class LaunchLever {
  _flags: Toggle[] = [];
  constructor(flags: Toggle[]) {
    this._flags = flags;
  }

  toggles(): Toggle[] {
    return this._flags;
  }

  flags() {
    let toggles: ToggleStatuses = {};
    for (let t of this._flags) {
      toggles[t.name] = t.status;
    }
    return toggles;
  }
}
