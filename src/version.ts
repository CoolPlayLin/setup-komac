import { Octokit } from "@octokit/rest";

const api = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const LATEST_RELEASE = (
  await api.repos.getLatestRelease({
    owner: "russellbanks",
    repo: "komac",
  })
).data.html_url;

function komac_version(version: string): string {
  let v: string;
  v = version;
  if (!(v === "newest" || v === "latest")) {
    if (!version.startsWith("v")) {
      v = "v" + v;
    }
    let v_list = v.split(".");
    while (v_list.length < 3) {
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
      if (!v.match(/^v?\d+(\.\d+)*$/)) {
        v = "latest";
      }
      break;
  }
  return v;
}

export { LATEST_RELEASE, komac_version };
