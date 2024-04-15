export interface Toggle {
  name: string;
  description: string;
  status: "on" | "off";
}

export type ToggleStatus = "on" | "off";

export interface ToggleStatuses {
  [key: string]: ToggleStatus;
}

export type fileType = "yml" | "json"
