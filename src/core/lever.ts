import { Toggle, ToggleStatus } from "../types";

/**
 * Lever represents a single feature toggle with its properties and state.
 * This is an immutable value object that encapsulates toggle logic.
 */
export class Lever implements Toggle {
  constructor(
    public readonly name: string,
    public readonly status: ToggleStatus,
    public readonly description: string,
    public readonly meta?: Toggle["meta"]
  ) {
    this.validate();
  }

  /**
   * Validates that the lever has required properties
   */
  private validate(): void {
    if (
      !this.name ||
      typeof this.name !== "string" ||
      this.name.trim().length === 0
    ) {
      throw new Error("Lever name must be a non-empty string");
    }
    if (this.status !== "on" && this.status !== "off") {
      throw new Error(
        `Lever status must be "on" or "off", got: ${this.status}`
      );
    }
    if (!this.description || typeof this.description !== "string") {
      throw new Error("Lever description must be a non-empty string");
    }
  }

  /**
   * Checks if the lever is turned on
   */
  isOn(): boolean {
    return this.status === "on";
  }

  /**
   * Checks if the lever is turned off
   */
  isOff(): boolean {
    return this.status === "off";
  }

  /**
   * Creates a new Lever with updated status
   */
  withStatus(status: ToggleStatus): Lever {
    return new Lever(this.name, status, this.description, this.meta);
  }

  /**
   * Converts the lever to a plain object
   */
  toJSON(): Toggle {
    return {
      name: this.name,
      status: this.status,
      description: this.description,
      ...(this.meta && { meta: this.meta }),
    };
  }

  /**
   * Creates a Lever from a Toggle object
   */
  static fromToggle(toggle: Toggle): Lever {
    return new Lever(
      toggle.name,
      toggle.status,
      toggle.description,
      toggle.meta
    );
  }
}
