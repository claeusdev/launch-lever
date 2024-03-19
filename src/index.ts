export interface Toggle {
  name: string;
  description: string;
  status: "on" | "off";
}

interface ToggleStatuses {
  [key: string]: "on" | "off";
}

export class LaunchLever {
  _flags: Toggle[] = [];
  constructor(flags: Toggle[]) {
    this._flags = flags;
  }

  get flags() {
    let toggles: ToggleStatuses = {};
    for (let t of this._flags) {
      toggles[t.name] = t.status;
    }
    return toggles;
  }
}

export default {
  LaunchLever,
};
