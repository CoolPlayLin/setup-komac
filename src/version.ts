import env from "./env";

const LATEST_RELEASE = (
  await env.api.repos.getLatestRelease({
    owner: env.repo.owner,
    repo: env.repo.repo,
  })
).data.html_url;

/**
 *
 * verify version whether follow the rule
 *
 * @param version version that needs to be verify
 * @returns verified version
 */
function version_verify(version: string): string {
  let v: string;
  v = version;
  if (!["newest", "latest"].includes(v)) {
    if (!v.startsWith("v")) {
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

export { LATEST_RELEASE, version_verify };
