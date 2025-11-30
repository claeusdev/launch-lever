export type ToggleStatus = "on" | "off";

export type ToggleMeta = {
  percentage?: number;
  [key: string]: unknown;
};

export type Toggle = {
  name: string;
  description: string;
  status: ToggleStatus;
  meta?: ToggleMeta;
};

export type ToggleStore = {
  [key: string]: Toggle;
};

export type ToggleStatuses = {
  [key: string]: ToggleStatus;
};

export interface LaunchLeverConfig {
  /**
   * Whether to throw errors when accessing non-existent toggles
   * @default false
   */
  strict?: boolean;
}
