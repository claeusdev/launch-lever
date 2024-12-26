import { LaunchLever } from "./index";
import { Toggle, ToggleStore } from "./types";

const flags: Toggle[] = [
  {
    name: "pfx_123",
    description: "Some new feature we're releasing soon.",
    status: "on",
  },
];

describe("LaunchLever", () => {
  let toggles: ToggleStore = {};
  beforeEach(() => {
    toggles = LaunchLever.fromList([
      {
        name: "pfx_123",
        description: "some stuff",
        status: "off",
      },
    ]);
  });
  test("it should return false for status", () => {
    expect(LaunchLever.isOn("pfx_123")).toBeFalsy();
  });

  test("it should return all toggles", () => {
    expect(toggles).toEqual({
      pfx_123: {
        name: "pfx_123",
        description: "some stuff",
        status: "off",
      },
    });
  });
});
