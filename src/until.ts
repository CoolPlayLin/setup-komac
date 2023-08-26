import { join } from "path";
import { mkdir } from "fs";

/**
 *
 * Automatically generate executable script according to platform
 *
 * @param java_path path of java execution
 * @param path path of komac execution
 * @returns executable script text and the filetype of script
 */
function generate_script(
  java_path: string,
  path: string,
): {
  script: string;
  filetype: string;
} {
  let script;
  let filetype;
  switch (process.platform) {
    case "win32":
      script = `
        # Path to the komac.jar file (update this if necessary)
        $KOMAC = "${path}"

        # Check if komac.jar exists
        if (-Not (Test-Path -Path $KOMAC_JAR -PathType Leaf)) {
            Write-Host "Error: komac.jar not found."
            exit 1
        }

        # Run the Java application
        ${java_path} -jar $KOMAC $args
        `;
      filetype = "ps1";
      break;
    case "darwin":
    case "linux":
      script = `
        #!/bin/bash

        # Path to the komac.jar file (update this if necessary)
        KOMAC_JAR=${path}

        # Check if komac.jar exists
        if [ ! -f "$KOMAC_JAR" ]; then
        echo "Error: komac.jar not found."
        exit 1
        fi

        # Run the Java application
        ${java_path} -jar "$KOMAC_JAR" "$@"
      `;
      filetype = "sh";
  }

  return {
    script: script,
    filetype: filetype,
  };
}

/**
 *
 * Automatically search for nice path to save komac
 *
 * @returns created path
 */
function find_path(): string {
  let path: string;
  switch (process.platform) {
    case "win32":
      let parent_path_win32: string;
      path = join(parent_path_win32 + ".komac");
      break;
    case "darwin":
    case "linux":
      let parent_path_linux: string;
      path = join(parent_path_linux + ".komac");
    default:
      throw Error(`Platform that hasn't support: ${process.platform}`);
  }

  mkdir(path, () => {});
  return path;
}

export { generate_script, find_path };
