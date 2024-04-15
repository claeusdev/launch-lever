import { readFileSync } from "node:fs"
import { parse } from "yaml"
import { Toggle, ToggleStatus, ToggleStatuses } from "./types";

export function isOn(status: ToggleStatus): boolean {
  return status === "on";
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
