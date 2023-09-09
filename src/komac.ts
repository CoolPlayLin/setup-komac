import { writeFileSync } from "fs";
import { generate_script } from "./until";
import { Octokit } from "@octokit/rest";
import env from "./env";
import { startGroup, endGroup } from "@actions/core"
import { execSync } from "child_process"

function main(komac_version: string) {
  let java_path: string;
  let komac_path: string;
  let shell: string;
  let script_command: string;
  startGroup("generate install script")
  endGroup()
  startGroup("Running generate script")
  execSync(script_command, {
    shell: shell,
    stdio: 'inherit'
  })
  endGroup()
}

export { main };
