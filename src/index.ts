export interface Toggle {
  name: string;
  description: string;
  status: "on" | "off";
}

type ToggleStatus = "on" | "off";
interface ToggleStatuses {
  [key: string]: ToggleStatus;
}

export const isOn = (status: ToggleStatus): boolean => status === "on";

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
