import { komac_version, get_komac } from "../src/until";
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
    expect(komac_version("1.1.1.1")).toBe("latest");
    expect(komac_version("1,1,1")).toBe("latest");
    expect(komac_version("1.1.")).toBe("latest");
  });
});

describe("get_komac", () => {
  const api = new Octokit({
    auth: process.env.GITHUB_TOKEN,
    userAgent: "setup-komac unittest",
  });
  it("return latest version when input latest|newest", async () => {
    expect(await get_komac("latest")).toBe(
      (
        await api.repos.getLatestRelease({
          owner: "russellbanks",
          repo: "Komac",
        })
      ).data.html_url
    );
    expect(await get_komac("newest")).toBe(
      (
        await api.repos.getLatestRelease({
          owner: "russellbanks",
          repo: "Komac",
        })
      ).data.html_url
    );
  });
  it("return latest when input invalid value", async () => {
    expect(await get_komac("1,1,1")).toBe(
      (
        await api.repos.getLatestRelease({
          owner: "russellbanks",
          repo: "Komac",
        })
      ).data.html_url
    );
    expect(await get_komac("1.1.")).toBe(
      (
        await api.repos.getLatestRelease({
          owner: "russellbanks",
          repo: "Komac",
        })
      ).data.html_url
    );
    expect(await get_komac("invalid")).toBe(
      (
        await api.repos.getLatestRelease({
          owner: "russellbanks",
          repo: "Komac",
        })
      ).data.html_url
    );
    
  });
});
