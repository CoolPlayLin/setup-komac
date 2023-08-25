import { Octokit } from "@octokit/rest";

export function komac_version(version: string): string {
  let v: string;
  v = version;
  if (!(v === "newest" || v === "latest")) {
    if (!version.startsWith("v")) {
      v = "v" + v;
    }
    let v_list = v.split(".");
    if (v_list.length === 1) {
      v_list.push("0");
      v_list.push("0");
    } else if (v_list.length === 2) {
      v_list.push("0");
    }
    v = v_list.join(".");
  }

  switch (v) {
    case "newest":
    case "latest":
      break;
    default:
      // Using regex to verify
      if (!v.match(/^(v)?[0-9]+\.[0-9]+\.[0-9]+$/)) {
        v = "latest";
      }
      break;
  }
  return v;
}

export async function get_komac(
  version: string,
  token?: string
): Promise<string> {
  const api = new Octokit({
    auth: token,
  });

  // handle version
  const v = komac_version(version);
  let url: string;

  switch (v) {
    case "newest":
    case "latest":
      url = (
        await api.repos.getLatestRelease({
          repo: "Komac",
          owner: "russellbanks",
        })
      ).data.html_url;
      break;
    default:
      url = (
        await api.repos.getReleaseByTag({
          repo: "Komac",
          owner: "russellbanks",
          tag: v,
        })
      ).data.html_url;
      break;
  }

  return url;
}
