import { Toggle, ToggleStatus, ToggleStatuses } from "./types";

export function isOn(status: ToggleStatus): boolean {
  return status === "on";
}

export class LaunchLever {
  _flags: Toggle[] = [];
  constructor(flags: Toggle[]) {
    this._flags = flags;
  }

  get toggles(): Toggle[] {
    return this._flags;
  }

  get flags() {
    let toggles: ToggleStatuses = {};
    for (let t of this._flags) {
      toggles[t.name] = t.status;
    }
    return toggles;
  }
}
