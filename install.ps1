[CmdletBinding()]
param(
  [string]$RepoUrl = "https://github.com/notysozu/smartdesk.git",
  [string]$RepoBranch = "main",
  [string]$InstallDir = "$HOME\smartdesk",
  [ValidateSet("dev", "production")]
  [string]$StartMode = "dev",
  [switch]$SkipStart,
  [switch]$SeedDb
)

$ErrorActionPreference = "Stop"

function Write-Log {
  param([string]$Message)
  Write-Host "[smartdesk] $Message" -ForegroundColor Cyan
}

function Write-WarnLog {
  param([string]$Message)
  Write-Host "[smartdesk] $Message" -ForegroundColor Yellow
}

function Fail {
  param([string]$Message)
  throw "[smartdesk] $Message"
}

function Test-Command {
  param([string]$Name)
  return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Install-WithWinget {
  param(
    [string]$Id,
    [string]$Name
  )

  if (-not (winget list --id $Id --exact | Select-String $Id -Quiet)) {
    Write-Log "Installing $Name with winget"
    winget install --id $Id --exact --accept-package-agreements --accept-source-agreements
  }
}

function Install-WithChoco {
  param(
    [string]$Id,
    [string]$Name
  )

  if (-not (choco list --local-only --exact $Id | Select-String "^$Id" -Quiet)) {
    Write-Log "Installing $Name with Chocolatey"
    choco install $Id -y
  }
}

function Ensure-Prerequisites {
  if (Test-Command winget) {
    Install-WithWinget -Id "Git.Git" -Name "Git"
    Install-WithWinget -Id "OpenJS.NodeJS.LTS" -Name "Node.js LTS"
  } elseif (Test-Command choco) {
    Install-WithChoco -Id "git" -Name "Git"
    Install-WithChoco -Id "nodejs-lts" -Name "Node.js LTS"
  } else {
    Fail "Install winget or Chocolatey first, then rerun this script."
  }

  if (-not (Test-Command git)) {
    $gitPath = Join-Path ${env:ProgramFiles} "Git\cmd\git.exe"
    if (Test-Path $gitPath) {
      $env:Path = "$([System.IO.Path]::GetDirectoryName($gitPath));$env:Path"
    }
  }

  if (-not (Test-Command node) -or -not (Test-Command npm)) {
    $nodePath = Join-Path ${env:ProgramFiles} "nodejs"
    if (Test-Path $nodePath) {
      $env:Path = "$nodePath;$env:Path"
    }
  }

  if (-not (Test-Command git)) { Fail "Git is not available after installation." }
  if (-not (Test-Command node)) { Fail "Node.js is not available after installation." }
  if (-not (Test-Command npm)) { Fail "npm is not available after installation." }

  $nodeMajor = [int](node -p "process.versions.node.split('.')[0]")
  if ($nodeMajor -lt 20) {
    Fail "Node.js 20+ is required. Found $(node -v)."
  }
}

function Resolve-RepoDir {
  if ((Test-Path ".\package.json") -and (Test-Path ".\client\package.json")) {
    return (Get-Location).Path
  }
  return $InstallDir
}

function Clone-OrUpdateRepo {
  param([string]$RepoDir)

  if ((Test-Path (Join-Path $RepoDir "package.json")) -and (Test-Path (Join-Path $RepoDir "client\package.json"))) {
    Write-Log "Using existing SmartDesk repository at $RepoDir"
    return
  }

  if (Test-Path (Join-Path $RepoDir ".git")) {
    Write-Log "Updating existing repository at $RepoDir"
    git -C $RepoDir fetch --depth=1 origin $RepoBranch
    git -C $RepoDir checkout $RepoBranch
    git -C $RepoDir pull --ff-only origin $RepoBranch
    return
  }

  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $RepoDir) | Out-Null
  Write-Log "Cloning $RepoUrl into $RepoDir"
  git clone --branch $RepoBranch $RepoUrl $RepoDir
}

function Copy-EnvIfMissing {
  param(
    [string]$Source,
    [string]$Destination
  )

  if (Test-Path $Destination) {
    Write-Log "Keeping existing $Destination"
  } else {
    Copy-Item $Source $Destination
    Write-Log "Created $Destination from $Source"
  }
}

function Setup-EnvFiles {
  param([string]$RepoDir)

  Copy-EnvIfMissing -Source (Join-Path $RepoDir ".env.example") -Destination (Join-Path $RepoDir ".env")
  Copy-EnvIfMissing -Source (Join-Path $RepoDir "client\.env.example") -Destination (Join-Path $RepoDir "client\.env.local")
}

function Install-ProjectDependencies {
  param([string]$RepoDir)

  Write-Log "Installing backend dependencies"
  Push-Location $RepoDir
  npm install
  Pop-Location

  Write-Log "Installing frontend dependencies"
  Push-Location (Join-Path $RepoDir "client")
  npm install
  Pop-Location
}

function Invoke-SeedIfRequested {
  param([string]$RepoDir)

  if ($SeedDb) {
    Write-Log "Seeding database"
    Push-Location $RepoDir
    npm run seed
    Pop-Location
  }
}

function Invoke-BuildIfNeeded {
  param([string]$RepoDir)

  if ($StartMode -eq "production") {
    Write-Log "Building frontend for production"
    Push-Location (Join-Path $RepoDir "client")
    npm run build
    Pop-Location
  }
}

function Get-MongoUri {
  param([string]$RepoDir)

  $envFile = Join-Path $RepoDir ".env"
  if (-not (Test-Path $envFile)) { return "" }
  $line = Get-Content $envFile | Where-Object { $_ -match '^MONGO_URI=' } | Select-Object -First 1
  if (-not $line) { return "" }
  return $line.Substring("MONGO_URI=".Length)
}

function Test-LocalMongoReachable {
  node -e "const net=require('net');const s=net.connect(27017,'127.0.0.1');s.setTimeout(1500);s.on('connect',()=>{s.destroy();process.exit(0)});s.on('timeout',()=>{s.destroy();process.exit(1)});s.on('error',()=>process.exit(1));" 2>$null | Out-Null
  return ($LASTEXITCODE -eq 0)
}

function Start-Backend {
  param([string]$RepoDir)

  $mongoUri = Get-MongoUri -RepoDir $RepoDir
  if ($mongoUri -match '^mongodb://(localhost|127\.0\.0\.1|0\.0\.0\.0)') {
    if (-not (Test-LocalMongoReachable)) {
      Write-WarnLog "Local MongoDB is not reachable on localhost:27017. Skipping backend start."
      return $null
    }
  }

  $backendCommand = if ($StartMode -eq "production") { "npm start" } else { "npm run dev" }
  Write-Log "Starting backend ($backendCommand)"

  $process = Start-Process -FilePath "powershell" -ArgumentList "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", "Set-Location '$RepoDir'; $backendCommand" -PassThru
  return $process
}

function Start-Frontend {
  param([string]$RepoDir)

  $frontendDir = Join-Path $RepoDir "client"
  $frontendScript = if ($StartMode -eq "production") { "start" } else { "dev" }

  Write-Log "Starting frontend (npm run $frontendScript)"
  Write-Log "Frontend URL: http://localhost:3000"
  Push-Location $frontendDir
  try {
    npm run $frontendScript
  } finally {
    Pop-Location
  }
}

function Main {
  Ensure-Prerequisites

  $repoDir = Resolve-RepoDir
  Clone-OrUpdateRepo -RepoDir $repoDir
  Setup-EnvFiles -RepoDir $repoDir
  Install-ProjectDependencies -RepoDir $repoDir
  Invoke-SeedIfRequested -RepoDir $repoDir
  Invoke-BuildIfNeeded -RepoDir $repoDir

  Write-Host ""
  Write-Log "Security note: review remote scripts before using iwr ... | iex in production environments."
  Write-Log "Environment files:"
  Write-Log " - $(Join-Path $repoDir '.env')"
  Write-Log " - $(Join-Path $repoDir 'client\.env.local')"

  if (-not $SkipStart) {
    $backendProcess = Start-Backend -RepoDir $repoDir
    try {
      Start-Frontend -RepoDir $repoDir
    } finally {
      if ($backendProcess -and -not $backendProcess.HasExited) {
        Stop-Process -Id $backendProcess.Id -Force -ErrorAction SilentlyContinue
      }
    }
  } else {
    Write-Log "Install complete. Start backend with: cd $repoDir; npm run dev"
    Write-Log "Start frontend with: cd $(Join-Path $repoDir 'client'); npm run dev"
  }
}

Main
