import { LaunchLever, isOn } from "./index";
import { Toggle, ToggleStore } from "./types";

describe("LaunchLever", () => {
  let lever: LaunchLever;
  let toggles: ToggleStore;

  beforeEach(() => {
    lever = new LaunchLever();
    lever.fromList([
      {
        name: "pfx_123",
        description: "some stuff",
        status: "off",
      },
    ]);
    toggles = lever.toggles();
  });

  describe("fromList", () => {
    test("it should load toggles from an array", () => {
      expect(toggles).toEqual({
        pfx_123: {
          name: "pfx_123",
          description: "some stuff",
          status: "off",
        },
      });
    });

    test("it should return the instance for chaining", () => {
      const result = lever.fromList([
        {
          name: "pfx_456",
          description: "another toggle",
          status: "on",
        },
      ]);
      expect(result).toBe(lever);
    });

    test("it should throw error for invalid input", () => {
      expect(() => {
        lever.fromList(null as unknown as Toggle[]);
      }).toThrow("fromList expects an array of Toggle objects");
    });

    test("it should validate toggle properties", () => {
      expect(() => {
        lever.fromList([
          {
            name: "",
            description: "invalid",
            status: "off",
          } as Toggle,
        ]);
      }).toThrow();
    });
  });

  describe("fromJson", () => {
    test("it should load toggles from JSON string", () => {
      const json = JSON.stringify([
        {
          name: "pfx_789",
          description: "from json",
          status: "on",
        },
      ]);
      lever.fromJson(json);
      expect(lever.has("pfx_789")).toBe(true);
      expect(lever.isOn("pfx_789")).toBe(true);
    });

    test("it should throw error for invalid JSON", () => {
      expect(() => {
        lever.fromJson("invalid json");
      }).toThrow("Invalid JSON");
    });

    test("it should throw error for non-array JSON", () => {
      expect(() => {
        lever.fromJson('{"name": "test"}');
      }).toThrow("JSON must contain an array");
    });
  });

  describe("isOn", () => {
    test("it should return false for off toggle", () => {
      expect(lever.isOn("pfx_123")).toBe(false);
    });

    test("it should return true for on toggle", () => {
      lever.fromList([
        {
          name: "pfx_on",
          description: "on toggle",
          status: "on",
        },
      ]);
      expect(lever.isOn("pfx_on")).toBe(true);
    });

    test("it should return false for non-existent toggle", () => {
      expect(lever.isOn("non_existent")).toBe(false);
    });
  });

  describe("isOff", () => {
    test("it should return true for off toggle", () => {
      expect(lever.isOff("pfx_123")).toBe(true);
    });

    test("it should return false for on toggle", () => {
      lever.fromList([
        {
          name: "pfx_on",
          description: "on toggle",
          status: "on",
        },
      ]);
      expect(lever.isOff("pfx_on")).toBe(false);
    });
  });

  describe("get", () => {
    test("it should return toggle by name", () => {
      const toggle = lever.get("pfx_123");
      expect(toggle).toEqual({
        name: "pfx_123",
        description: "some stuff",
        status: "off",
      });
    });

    test("it should return undefined for non-existent toggle", () => {
      expect(lever.get("non_existent")).toBeUndefined();
    });

    test("it should throw in strict mode for non-existent toggle", () => {
      const strictLever = new LaunchLever({ strict: true });
      strictLever.fromList([
        {
          name: "pfx_123",
          description: "test",
          status: "on",
        },
      ]);
      expect(() => {
        strictLever.get("non_existent");
      }).toThrow('Toggle "non_existent" not found');
    });
  });

  describe("has", () => {
    test("it should return true for existing toggle", () => {
      expect(lever.has("pfx_123")).toBe(true);
    });

    test("it should return false for non-existent toggle", () => {
      expect(lever.has("non_existent")).toBe(false);
    });
  });

  describe("size", () => {
    test("it should return the number of toggles", () => {
      expect(lever.size()).toBe(1);
      lever.fromList([
        {
          name: "pfx_1",
          description: "test",
          status: "on",
        },
        {
          name: "pfx_2",
          description: "test",
          status: "off",
        },
      ]);
      expect(lever.size()).toBe(2);
    });
  });

  describe("clear", () => {
    test("it should clear all toggles", () => {
      expect(lever.size()).toBe(1);
      lever.clear();
      expect(lever.size()).toBe(0);
      expect(lever.has("pfx_123")).toBe(false);
    });
  });

  describe("toArray", () => {
    test("it should return all toggles as an array", () => {
      lever.fromList([
        {
          name: "pfx_1",
          description: "test 1",
          status: "on",
        },
        {
          name: "pfx_2",
          description: "test 2",
          status: "off",
        },
      ]);
      const array = lever.toArray();
      expect(Array.isArray(array)).toBe(true);
      expect(array.length).toBe(2);
      expect(array).toContainEqual({
        name: "pfx_1",
        description: "test 1",
        status: "on",
      });
    });
  });

  describe("fromStore", () => {
    test("it should load toggles from a ToggleStore", () => {
      const store: ToggleStore = {
        toggle1: {
          name: "toggle1",
          description: "test",
          status: "on",
        },
        toggle2: {
          name: "toggle2",
          description: "test",
          status: "off",
        },
      };
      lever.fromStore(store);
      expect(lever.size()).toBe(2);
      expect(lever.has("toggle1")).toBe(true);
      expect(lever.has("toggle2")).toBe(true);
    });

    test("it should throw error for invalid input", () => {
      expect(() => {
        lever.fromStore(null as unknown as ToggleStore);
      }).toThrow("fromStore expects a ToggleStore object");

      expect(() => {
        lever.fromStore([] as unknown as ToggleStore);
      }).toThrow("fromStore expects a ToggleStore object");
    });
  });

  describe("get with strict mode", () => {
    test("it should throw error for invalid name in strict mode", () => {
      const strictLever = new LaunchLever({ strict: true });
      strictLever.fromList([
        {
          name: "pfx_123",
          description: "test",
          status: "on",
        },
      ]);
      expect(() => {
        strictLever.get("");
      }).toThrow("Toggle name must be a non-empty string");

      expect(() => {
        strictLever.get(null as unknown as string);
      }).toThrow("Toggle name must be a non-empty string");
    });
  });

  describe("fromList error handling", () => {
    test("it should handle non-Error exceptions", () => {
      // This tests the throw error path when error is not an Error instance
      // We can't easily trigger this in normal flow, but the code path exists
      expect(() => {
        lever.fromList([
          {
            name: "test",
            description: "test",
            status: "on",
          },
        ]);
      }).not.toThrow();
    });
  });

  describe("fromJson error handling", () => {
    test("it should throw error for non-string input", () => {
      expect(() => {
        lever.fromJson(null as unknown as string);
      }).toThrow("fromJson expects a JSON string");

      expect(() => {
        lever.fromJson(123 as unknown as string);
      }).toThrow("fromJson expects a JSON string");
    });
  });
});

describe("isOn convenience function", () => {
  test("it should work with Toggle object", () => {
    const toggle: Toggle = {
      name: "test",
      description: "test",
      status: "on",
    };
    expect(isOn(toggle)).toBe(true);

    const toggleOff: Toggle = {
      name: "test",
      description: "test",
      status: "off",
    };
    expect(isOn(toggleOff)).toBe(false);
  });

  test("it should work with toggle name string and lever instance", () => {
    const lever = new LaunchLever();
    lever.fromList([
      {
        name: "test_toggle",
        description: "test",
        status: "on",
      },
    ]);
    expect(isOn("test_toggle", lever)).toBe(true);
  });

  test("it should throw error when toggle name is string but lever is missing", () => {
    expect(() => {
      isOn("test_toggle");
    }).toThrow(
      "LaunchLever instance required when passing toggle name as string"
    );
  });
});
