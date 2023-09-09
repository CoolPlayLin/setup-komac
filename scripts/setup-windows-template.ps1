[String] $Version = "__Version__"
[String] $Path = "__Path__"
[String] $Url = "__Url__"

function Download_Build {
  param (
  [string] $Path,
  [string] $Version,
  [string] $Url
  )
  for ($Times = 3; $Times -gt 0; $Times--) {
    if ($Times -eq 3){
      Write-Host "Retry download for $Komac $Version, $Times time(s) left" -ForegroundColor Yellow
    }
    Write-Host "Acquiring $Version from $Url" -ForegroundColor Blue
    try {
      Invoke-WebRequest -Uri $Url -OutFile $Path
      Write-Host "$Komac Download complete" -ForegroundColor Green
      break
    }
    catch {
      Write-Host "$Komac Download failed" -ForegroundColor Red
    }
  }
  
}

Download_Build -Path $Path -Version $Version -Url "https://gh.api-go.asia/https://github.com/russellbanks/Komac/releases/download/v1.11.0/Komac-1.11.0-all.jar"