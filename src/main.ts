import { getInput } from "@actions/core";
import { version_verify } from "./version";
import { main } from "./komac";

const komac_version = version_verify(getInput("komac-version"));
if (komac_version !== getInput("komac-version")) {
  console.warn(
    `Unknown version with ${getInput(
      "komac-version",
    )}, using latest version instead`,
  );
}
const PATH = main(komac_version);
console.log(`Your komac has been installed in ${PATH}\nThanks for using❤️`);
