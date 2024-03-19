import { LaunchLever, Toggle } from "./index";

const flags: Toggle[] = [
  {
    name: "pfx_123",
    description: "Some new feature we're releasing soon.",
    status: "on",
  },
];

test("it should return 'on' is status is on", () => {
  const toggles = new LaunchLever(flags).flags;
  expect(toggles.pfx_123).toEqual("on");
});

test("it should return 'off' is status is off", () => {
  const toggles = new LaunchLever([
    {
      name: "pfx_123",
      description: "some stuff",
      status: "off",
    },
  ]).flags;
  expect(toggles.pfx_123).toEqual("off");
});
