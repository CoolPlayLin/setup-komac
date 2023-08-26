import { version_verify } from "../src/version";
import { describe, it, expect } from "vitest";

describe("version_verify", () => {
  it("return original value when input latest|newest", () => {
    expect(version_verify("latest")).toBe("latest");
    expect(version_verify("newest")).toBe("newest");
  });
  it("automatically completion when lost sub-version", () => {
    expect(version_verify("1.1")).toBe("v1.1.0");
    expect(version_verify("1.1.0")).toBe("v1.1.0");
    expect(version_verify("1")).toBe("v1.0.0");
  });
  it("add string 'v' when lost", () => {
    expect(version_verify("1.0.1")).toBe("v1.0.1");
    expect(version_verify("1.1.0")).toBe("v1.1.0");
    expect(version_verify("1.1.10")).toBe("v1.1.10");
  });
  it("return latest when input invalid value", () => {
    expect(version_verify("1.1.1,1")).toBe("latest");
    expect(version_verify("1,1,1")).toBe("latest");
    expect(version_verify("1.1.")).toBe("latest");
  });
  it("return original when more than three", () => {
    expect(version_verify("1.1.1.1")).toBe("v1.1.1.1");
    expect(version_verify("1.1.1.1.1")).toBe("v1.1.1.1.1");
    expect(version_verify("1.1.1.1.1.1")).toBe("v1.1.1.1.1.1");
  });
});
