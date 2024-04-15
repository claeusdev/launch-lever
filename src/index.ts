import { Toggle, ToggleStatus, ToggleStatuses } from "./types";
import { YamlParser } from "./YamlParser"

export function isOn(status: ToggleStatus): boolean {
  return status === "on";
}

export class LaunchLever {
  _flags: Toggle[] = [];
  constructor(flagsFile: string) {
    this._flags = new YamlParser(flagsFile).readFile().getFlags()
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

const flags = new LaunchLever("./src/file.yml")
console.log(flags.flags())
