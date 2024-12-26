export type Toggle = {
  name: string;
  description: string;
  status: "on" | "off";
  meta?: {
    percentage: number;
  };
};

export type ToggleStore = {
  [key: string]: Toggle;
};

export type ToggleStatus = "on" | "off";

export type ToggleStatuses = {
  [key: string]: ToggleStatus;
};
