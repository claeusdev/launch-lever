import {
  Toggle,
  ToggleStore,
  ToggleStatus,
  ToggleStatuses,
  ToggleMeta,
  LaunchLeverConfig,
} from "./types";
import { Lever } from "./core/lever";

/**
 * LaunchLever is the main class for managing feature toggles.
 * It provides methods to load, query, and manage feature flags.
 */
export class LaunchLever {
  private _toggles: ToggleStore = {};
  private readonly config: Required<LaunchLeverConfig>;

  constructor(config: LaunchLeverConfig = {}) {
    this.config = {
      strict: config.strict ?? false,
    };
  }

  /**
   * Loads toggles from an array of Toggle objects
   */
  fromList(list: Toggle[]): LaunchLever {
    if (!Array.isArray(list)) {
      throw new Error("fromList expects an array of Toggle objects");
    }

    const newToggles: ToggleStore = {};
    for (const toggle of list) {
      try {
        const lever = Lever.fromToggle(toggle);
        newToggles[lever.name] = lever.toJSON();
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Invalid toggle "${toggle.name}": ${error.message}`);
        }
        throw error;
      }
    }
    this._toggles = newToggles;
    return this;
  }

  /**
   * Loads toggles from a JSON string
   */
  fromJson(json: string): LaunchLever {
    if (typeof json !== "string") {
      throw new Error("fromJson expects a JSON string");
    }

    try {
      const parsed = JSON.parse(json);
      if (!Array.isArray(parsed)) {
        throw new Error("JSON must contain an array of toggle objects");
      }
      return this.fromList(parsed);
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error(`Invalid JSON: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Loads toggles from a ToggleStore object
   */
  fromStore(store: ToggleStore): LaunchLever {
    if (typeof store !== "object" || store === null || Array.isArray(store)) {
      throw new Error("fromStore expects a ToggleStore object");
    }

    const toggleList = Object.values(store);
    return this.fromList(toggleList);
  }

  /**
   * Returns all toggles as a ToggleStore
   */
  toggles(): ToggleStore {
    return { ...this._toggles };
  }

  /**
   * Returns all toggles as an array
   */
  toArray(): Toggle[] {
    return Object.values(this._toggles);
  }

  /**
   * Gets a specific toggle by name
   */
  get(name: string): Toggle | undefined {
    if (!name || typeof name !== "string") {
      if (this.config.strict) {
        throw new Error("Toggle name must be a non-empty string");
      }
      return undefined;
    }

    const toggle = this._toggles[name];
    if (!toggle && this.config.strict) {
      throw new Error(`Toggle "${name}" not found`);
    }
    return toggle;
  }

  /**
   * Checks if a toggle is turned on
   */
  isOn(name: string): boolean {
    const toggle = this.get(name);
    return toggle?.status === "on";
  }

  /**
   * Checks if a toggle is turned off
   */
  isOff(name: string): boolean {
    const toggle = this.get(name);
    return toggle?.status === "off";
  }

  /**
   * Checks if a toggle exists
   */
  has(name: string): boolean {
    return name in this._toggles;
  }

  /**
   * Returns the number of toggles
   */
  size(): number {
    return Object.keys(this._toggles).length;
  }

  /**
   * Clears all toggles
   */
  clear(): LaunchLever {
    this._toggles = {};
    return this;
  }

  /**
   * Resets the instance to a new state
   */
  reset(): LaunchLever {
    return this.clear();
  }
}

/**
 * Convenience function to check if a toggle is on
 * @deprecated Use LaunchLever instance method instead
 */
export function isOn(toggle: Toggle | string, lever?: LaunchLever): boolean {
  if (typeof toggle === "string") {
    if (!lever) {
      throw new Error(
        "LaunchLever instance required when passing toggle name as string"
      );
    }
    return lever.isOn(toggle);
  }
  return toggle.status === "on";
}

// Export types
export type {
  Toggle,
  ToggleStore,
  ToggleStatus,
  ToggleStatuses,
  ToggleMeta,
  LaunchLeverConfig,
};
