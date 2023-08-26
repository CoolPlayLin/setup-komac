import { komac_version,  LATEST_RELEASE } from "../src/version";
import { describe, it, expect } from "vitest";
import { Octokit } from "@octokit/rest";

describe("komac_version", () => {
  it("return original value when input latest|newest", () => {
    expect(komac_version("latest")).toBe("latest");
    expect(komac_version("newest")).toBe("newest");
  });
  it("automatically completion when lost sub-version", () => {
    expect(komac_version("1.1")).toBe("v1.1.0");
    expect(komac_version("1.1.0")).toBe("v1.1.0");
    expect(komac_version("1")).toBe("v1.0.0");
  });
  it("add string 'v' when lost", () => {
    expect(komac_version("1.0.1")).toBe("v1.0.1");
    expect(komac_version("1.1.0")).toBe("v1.1.0");
    expect(komac_version("1.1.10")).toBe("v1.1.10");
  });
  it("return latest when input invalid value", () => {
    expect(komac_version("1.1.1,1")).toBe("latest");
    expect(komac_version("1,1,1")).toBe("latest");
    expect(komac_version("1.1.")).toBe("latest");
  });
  it("return original when more than three", () => {
    expect(komac_version("1.1.1.1")).toBe("v1.1.1.1");
    expect(komac_version("1.1.1.1.1")).toBe("v1.1.1.1.1");
    expect(komac_version("1.1.1.1.1.1")).toBe("v1.1.1.1.1.1");
  });
});