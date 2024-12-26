import { Toggle, ToggleStatus, ToggleStatuses, ToggleStore } from "./types";
import * as core from "./core/lever";

export class LaunchLever {
  private static _toggles: ToggleStore = {};

  static fromList(list: Toggle[]): ToggleStore {
    for (let t of list) {
      this._toggles[t.name] = new core.Lever(
        t.name,
        t.status,
        t.description
      ) as unknown as Toggle;
    }
    return this._toggles;
  }

  static fromJson(fileName: string) {
    console.log("filename");
  }

  static toggles(): ToggleStore {
    return this._toggles;
  }

  static isOn(name: string) {
    return this.toggles()[name].status == "on";
  }
}
