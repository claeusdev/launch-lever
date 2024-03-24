import { LaunchLever, isOn } from "./index";
import { Toggle } from "./types";

const flags: Toggle[] = [
  {
    name: "pfx_123",
    description: "Some new feature we're releasing soon.",
    status: "on",
  },
];

describe("#isON", () => {
  test("should be true when flag is on", () => {
    expect(isOn("on")).toBeTruthy();
  });

  test("should be false when status if 'off'", () => {
    expect(isOn("off")).toBeFalsy();
  });
});

describe("LaunchLever", () => {
  test("it should return 'off' is status is off", () => {
    const toggles = new LaunchLever([
      {
        name: "pfx_123",
        description: "some stuff",
        status: "off",
      },
    ]).flags;
    expect(isOn(toggles.pfx_123)).toBeFalsy();
  });

  test("it should return 'on' is status is on", () => {
    const toggles = new LaunchLever(flags).flags;
    expect(isOn(toggles.pfx_123)).toBeTruthy();
  });

  test("it should return all toggles", () => {
    const toggles = new LaunchLever(flags).toggles;
    expect(toggles).toEqual(flags);
  });
});
