import { ToggleStatus } from "../types";

export class Lever {
  constructor(
    private name: string,
    private status: ToggleStatus,
    private description: string,
    meta: {} = {}
  ) {}
}
