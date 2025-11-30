import { Lever } from "./lever";
import { Toggle } from "../types";

describe("Lever", () => {
  describe("constructor", () => {
    test("it should create a lever with valid properties", () => {
      const lever = new Lever("test_toggle", "on", "Test description");
      expect(lever.name).toBe("test_toggle");
      expect(lever.status).toBe("on");
      expect(lever.description).toBe("Test description");
    });

    test("it should create a lever with meta", () => {
      const meta = { percentage: 50 };
      const lever = new Lever("test_toggle", "on", "Test description", meta);
      expect(lever.meta).toEqual(meta);
    });

    test("it should throw error for empty name", () => {
      expect(() => {
        new Lever("", "on", "description");
      }).toThrow("Lever name must be a non-empty string");
    });

    test("it should throw error for invalid status", () => {
      expect(() => {
        new Lever("test", "invalid" as "on", "description");
      }).toThrow('Lever status must be "on" or "off"');
    });

    test("it should throw error for empty description", () => {
      expect(() => {
        new Lever("test", "on", "");
      }).toThrow("Lever description must be a non-empty string");
    });
  });

  describe("isOn", () => {
    test("it should return true when status is on", () => {
      const lever = new Lever("test", "on", "description");
      expect(lever.isOn()).toBe(true);
    });

    test("it should return false when status is off", () => {
      const lever = new Lever("test", "off", "description");
      expect(lever.isOn()).toBe(false);
    });
  });

  describe("isOff", () => {
    test("it should return true when status is off", () => {
      const lever = new Lever("test", "off", "description");
      expect(lever.isOff()).toBe(true);
    });

    test("it should return false when status is on", () => {
      const lever = new Lever("test", "on", "description");
      expect(lever.isOff()).toBe(false);
    });
  });

  describe("withStatus", () => {
    test("it should create a new lever with updated status", () => {
      const lever = new Lever("test", "on", "description");
      const newLever = lever.withStatus("off");
      expect(newLever.status).toBe("off");
      expect(newLever.name).toBe("test");
      expect(newLever.description).toBe("description");
      expect(lever.status).toBe("on"); // original unchanged
    });
  });

  describe("toJSON", () => {
    test("it should convert lever to Toggle object", () => {
      const lever = new Lever("test", "on", "description");
      const json = lever.toJSON();
      expect(json).toEqual({
        name: "test",
        status: "on",
        description: "description",
      });
    });

    test("it should include meta in JSON when present", () => {
      const meta = { percentage: 75 };
      const lever = new Lever("test", "on", "description", meta);
      const json = lever.toJSON();
      expect(json.meta).toEqual(meta);
    });

    test("it should not include meta in JSON when absent", () => {
      const lever = new Lever("test", "on", "description");
      const json = lever.toJSON();
      expect(json.meta).toBeUndefined();
    });
  });

  describe("fromToggle", () => {
    test("it should create a Lever from a Toggle object", () => {
      const toggle: Toggle = {
        name: "test_toggle",
        status: "on",
        description: "Test description",
      };
      const lever = Lever.fromToggle(toggle);
      expect(lever.name).toBe("test_toggle");
      expect(lever.status).toBe("on");
      expect(lever.description).toBe("Test description");
    });

    test("it should create a Lever with meta from Toggle", () => {
      const toggle: Toggle = {
        name: "test_toggle",
        status: "on",
        description: "Test description",
        meta: { percentage: 50 },
      };
      const lever = Lever.fromToggle(toggle);
      expect(lever.meta).toEqual({ percentage: 50 });
    });
  });
});
