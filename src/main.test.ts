import { describe, expect, it } from "vitest";
import { mockBackend } from "./mock";

describe("mockBackend", () => {
  it("greets by name", async () => {
    await expect(mockBackend.greet("world")).resolves.toBe("hello, world (mock)");
  });
});
