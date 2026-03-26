#!/usr/bin/env bash

set -Eeuo pipefail

REPO_URL="${REPO_URL:-https://github.com/notysozu/smartdesk.git}"
REPO_BRANCH="${REPO_BRANCH:-main}"
INSTALL_DIR="${INSTALL_DIR:-$HOME/smartdesk}"
START_APP="${START_APP:-1}"
SEED_DB="${SEED_DB:-0}"
START_MODE="${START_MODE:-dev}"

BACKEND_LOG_DIR=".smartdesk"
BACKEND_PID_FILE="$BACKEND_LOG_DIR/backend.pid"
BACKEND_LOG_FILE="$BACKEND_LOG_DIR/backend.log"
FRONTEND_LOG_FILE="$BACKEND_LOG_DIR/frontend.log"

log() {
  printf '\033[1;34m[smartdesk]\033[0m %s\n' "$*"
}

warn() {
  printf '\033[1;33m[smartdesk]\033[0m %s\n' "$*" >&2
}

die() {
  printf '\033[1;31m[smartdesk]\033[0m %s\n' "$*" >&2
  exit 1
}

has_cmd() {
  command -v "$1" >/dev/null 2>&1
}

need_sudo=0
if [[ "${EUID:-$(id -u)}" -ne 0 ]] && has_cmd sudo; then
  need_sudo=1
fi

run_as_root() {
  if [[ "$need_sudo" -eq 1 ]]; then
    sudo "$@"
  else
    "$@"
  fi
}

detect_pm() {
  if has_cmd apt-get; then
    echo "apt"
  elif has_cmd dnf; then
    echo "dnf"
  elif has_cmd pacman; then
    echo "pacman"
  elif has_cmd brew; then
    echo "brew"
  else
    echo ""
  fi
}

install_base_packages() {
  local pm
  pm="$(detect_pm)"

  [[ -n "$pm" ]] || die "Unsupported package manager. Install git, curl, and Node.js 20+ manually."

  case "$pm" in
    apt)
      run_as_root apt-get update
      run_as_root apt-get install -y git curl ca-certificates
      if ! has_cmd node; then
        run_as_root apt-get install -y nodejs npm
      fi
      ;;
    dnf)
      run_as_root dnf install -y git curl ca-certificates
      if ! has_cmd node; then
        run_as_root dnf install -y nodejs npm
      fi
      ;;
    pacman)
      run_as_root pacman -Sy --noconfirm git curl ca-certificates
      if ! has_cmd node; then
        run_as_root pacman -Sy --noconfirm nodejs npm
      fi
      ;;
    brew)
      has_cmd git || brew install git
      has_cmd curl || brew install curl
      has_cmd node || brew install node
      ;;
  esac
}

ensure_node_version() {
  has_cmd node || die "Node.js is not installed."
  local major
  major="$(node -p 'process.versions.node.split(".")[0]')"
  if [[ "$major" -lt 20 ]]; then
    die "Node.js 20+ is required. Found $(node -v)."
  fi
}

detect_repo_dir() {
  if [[ -f "./package.json" && -f "./client/package.json" ]]; then
    pwd
    return
  fi

  if [[ -f "${0:-}/package.json" && -f "${0:-}/client/package.json" ]]; then
    dirname "${0}"
    return
  fi

  echo "$INSTALL_DIR"
}

clone_or_update_repo() {
  local repo_dir="$1"

  if [[ -f "$repo_dir/package.json" && -f "$repo_dir/client/package.json" ]]; then
    log "Using existing SmartDesk repository at $repo_dir"
    return
  fi

  if [[ -d "$repo_dir/.git" ]]; then
    log "Updating existing repository at $repo_dir"
    git -C "$repo_dir" fetch --depth=1 origin "$REPO_BRANCH"
    git -C "$repo_dir" checkout "$REPO_BRANCH"
    git -C "$repo_dir" pull --ff-only origin "$REPO_BRANCH"
    return
  fi

  mkdir -p "$(dirname "$repo_dir")"
  log "Cloning $REPO_URL into $repo_dir"
  git clone --branch "$REPO_BRANCH" "$REPO_URL" "$repo_dir"
}

copy_env_if_missing() {
  local src="$1"
  local dest="$2"
  if [[ -f "$dest" ]]; then
    log "Keeping existing $dest"
  else
    cp "$src" "$dest"
    log "Created $dest from $(basename "$src")"
  fi
}

setup_env_files() {
  local repo_dir="$1"
  copy_env_if_missing "$repo_dir/.env.example" "$repo_dir/.env"
  copy_env_if_missing "$repo_dir/client/.env.example" "$repo_dir/client/.env.local"
}

install_project_dependencies() {
  local repo_dir="$1"
  log "Installing backend dependencies"
  (cd "$repo_dir" && npm install)
  log "Installing frontend dependencies"
  (cd "$repo_dir/client" && npm install)
}

seed_database_if_requested() {
  local repo_dir="$1"
  if [[ "$SEED_DB" == "1" ]]; then
    log "Seeding database"
    (cd "$repo_dir" && npm run seed)
  fi
}

build_if_needed() {
  local repo_dir="$1"
  if [[ "$START_MODE" == "production" ]]; then
    log "Building frontend for production"
    (cd "$repo_dir/client" && npm run build)
  fi
}

mongo_uri_is_local() {
  local repo_dir="$1"
  local uri
  uri="$(grep -E '^MONGO_URI=' "$repo_dir/.env" | head -n1 | cut -d'=' -f2- || true)"
  [[ "$uri" == mongodb://localhost* || "$uri" == mongodb://127.0.0.1* || "$uri" == mongodb://0.0.0.0* ]]
}

local_mongo_is_reachable() {
  node -e "const net=require('net');const s=net.connect(27017,'127.0.0.1');s.setTimeout(1500);s.on('connect',()=>{s.destroy();process.exit(0)});s.on('timeout',()=>{s.destroy();process.exit(1)});s.on('error',()=>process.exit(1));"
}

cleanup_backend() {
  if [[ -n "${BACKEND_PID:-}" ]] && kill -0 "$BACKEND_PID" >/dev/null 2>&1; then
    log "Stopping backend process $BACKEND_PID"
    kill "$BACKEND_PID" >/dev/null 2>&1 || true
  fi
}

start_backend() {
  local repo_dir="$1"
  mkdir -p "$repo_dir/$BACKEND_LOG_DIR"

  if [[ -f "$repo_dir/$BACKEND_PID_FILE" ]]; then
    local existing_pid
    existing_pid="$(cat "$repo_dir/$BACKEND_PID_FILE" 2>/dev/null || true)"
    if [[ -n "$existing_pid" ]] && kill -0 "$existing_pid" >/dev/null 2>&1; then
      warn "Backend already running with PID $existing_pid"
      return
    fi
  fi

  if mongo_uri_is_local "$repo_dir" && ! local_mongo_is_reachable; then
    warn "Local MongoDB is not reachable on localhost:27017. Skipping backend start."
    warn "Update $repo_dir/.env with a reachable MONGO_URI or start MongoDB, then run: cd $repo_dir && npm run dev"
    return
  fi

  local backend_cmd
  if [[ "$START_MODE" == "production" ]]; then
    backend_cmd="npm start"
  else
    backend_cmd="npm run dev"
  fi

  log "Starting backend ($backend_cmd)"
  (
    cd "$repo_dir"
    nohup bash -lc "$backend_cmd" >"$BACKEND_LOG_FILE" 2>&1 &
    echo $! >"$BACKEND_PID_FILE"
  )
  BACKEND_PID="$(cat "$repo_dir/$BACKEND_PID_FILE")"
}

start_frontend() {
  local repo_dir="$1"
  local frontend_cmd
  if [[ "$START_MODE" == "production" ]]; then
    frontend_cmd="npm start"
  else
    frontend_cmd="npm run dev"
  fi

  log "Starting frontend ($frontend_cmd)"
  log "Frontend URL: http://localhost:3000"
  if [[ -f "$repo_dir/$BACKEND_PID_FILE" ]]; then
    log "Backend logs: $repo_dir/$BACKEND_LOG_FILE"
  fi
  trap cleanup_backend EXIT INT TERM
  (cd "$repo_dir/client" && bash -lc "$frontend_cmd")
}

main() {
  log "Installing system prerequisites"
  install_base_packages
  ensure_node_version

  local repo_dir
  repo_dir="$(detect_repo_dir)"
  clone_or_update_repo "$repo_dir"

  log "Preparing environment files"
  setup_env_files "$repo_dir"

  install_project_dependencies "$repo_dir"
  seed_database_if_requested "$repo_dir"
  build_if_needed "$repo_dir"

  cat <<EOF

Security note:
- This installer is readable at $REPO_URL
- Review remote scripts before using curl|bash in production environments

Environment files:
- $repo_dir/.env
- $repo_dir/client/.env.local
EOF

  if [[ "$START_APP" == "1" ]]; then
    start_backend "$repo_dir"
    start_frontend "$repo_dir"
  else
    log "Install complete. Start backend with: cd $repo_dir && npm run dev"
    log "Start frontend with: cd $repo_dir/client && npm run dev"
  fi
}

main "$@"
