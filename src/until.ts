export function generate_script(java_path: string ,path: string): {
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
