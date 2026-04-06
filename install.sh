#!/bin/bash
set -e

usage() {
  this=$1
  cat <<EOF
$this: download go binaries for diodechain/diode_go_client
Usage: $this [-b] bindir [version]
  -b sets bindir or installation directory, default "~/opt/diode"
   [version] is a version number from
   https://github.com/diodechain/diode_go_client/releases
   If version is missing, then an attempt to find the latest will be found.

WSL:
  When run inside WSL (Linux), this script installs the Linux CLI and also
  places diode.exe under your Windows user profile (default:
  /mnt/c/Users/<WindowsUsername>/opt/diode) so you can add it to Windows PATH.
  Override Windows install dir: BINDIR_WINDOWS=/mnt/c/Users/you/opt/diode
  Skip the Windows copy: DIODE_SKIP_WINDOWS_EXE=1

Git Bash (no WSL):
  Run: ...\\Git\\bin\\bash.exe -lc "curl -Ssf https://diode.io/install.sh | bash"

Force Windows build only (no Linux):
  set DIODE_OS=windows
  curl -Ssf https://diode.io/install.sh | bash
EOF
  exit 2
}

parse_args() {
  #BINDIR is ~/opt/diode unless set be ENV
  # over-ridden by flag below

  BINDIR=${BINDIR:-~/opt/diode}
  while getopts "b:h?" arg; do
    case "$arg" in
      b) BINDIR="$OPTARG" ;;
      h | \?) usage "$0" ;;
    esac
  done
  shift $((OPTIND - 1))
  VERSION=$1
}
# Expand ~/ and similar in BINDIR paths
expand_bindir() {
  eval echo "$1"
}

# Download and install one release (linux/amd64, windows/amd64, etc.)
install_one_platform() {
  local ios="$1" iarch="$2" idest_raw="$3"
  local idest
  idest=$(expand_bindir "$idest_raw")
  local plat="${ios}/${iarch}"
  if ! is_supported_platform "$plat"; then
    echo "$PREFIX: error: platform $plat is not supported"
    return 1
  fi
  local base="diode"
  local nm="${base}_${ios}_${iarch}"
  local tb="${nm}.${FORMAT}"
  local url="${GITHUB_DOWNLOAD}/v${VERSION}/${tb}"
  local binf="${base}"
  [ "$ios" = "windows" ] && binf="${base}.exe"
  local tmp
  tmp=$(mktmpdir)
  echo "$PREFIX: downloading ${url} to ${tmp}/${tb}"
  http_download "${tmp}/${tb}" "${url}"
  (cd "${tmp}" && untar "${tb}")
  install -d "${idest}"
  install "${tmp}/${binf}" "${idest}/"
  echo "$PREFIX: installed (${plat}) as ${idest}/${binf}"
}

append_shell_path() {
  local bdir="$1"
  TERM="export PATH=${bdir}:\$PATH"
  for FILE in ~/.bashrc ~/.bash_profile ~/.zshrc; do
    if test -f "$FILE"; then
      grep -qxF "$TERM" "$FILE" || echo "$TERM" >> "$FILE"
    else
      echo "$TERM" >> "$FILE"
    fi
    echo "$PREFIX: installed path into $FILE"
  done
  echo
  echo "Restart your terminal to use or run below line right now:"
  echo "export PATH=${bdir}:\$PATH"
}

wsl_detected() {
  [ -r /proc/version ] 2>/dev/null && grep -qi microsoft /proc/version 2>/dev/null
}

windows_username_for_wsl() {
  local u
  u=$(cmd.exe /c 'echo %USERNAME%' 2>/dev/null | tr -d '\r\n' | head -c 256)
  [ -n "$u" ] && echo "$u" && return
  echo "${USER:-user}"
}
is_supported_platform() {
  platform=$1
  found=1
  case "$platform" in
    darwin/amd64) found=0 ;;
    darwin/arm64) found=0 ;;
    darwin/386) found=0 ;;
    linux/arm) found=0 ;;
    linux/arm64) found=0 ;;
    linux/amd64) found=0 ;;
    linux/386) found=0 ;;
    windows/amd64) found=0 ;;
    windows/386) found=0 ;;
    freebsd/amd64) found=0 ;;
    freebsd/386) found=0 ;;
    netbsd/amd64) found=0 ;;
    netbsd/386) found=0 ;;
    openbsd/amd64) found=0 ;;
    openbsd/386) found=0 ;;
  esac
  return $found
}
check_platform() {
  if is_supported_platform "$PLATFORM"; then
    # optional logging goes here
    true
  else
    echo "${PREFIX}: platform $PLATFORM is not supported.  Make sure this script is up-to-date and file request at https://github.com/${PREFIX}/issues/new"
    exit 1
  fi
}
adjust_version() {
  if [ -z "${VERSION}" ]; then
    echo "$PREFIX: checking GitHub for latest version"
    VERSION=$(github_last_release "$OWNER/$REPO")
  fi
  # if version starts with 'v', remove it
  VERSION=${VERSION#v}
}
adjust_format() {
  # change format (tar.gz or zip) based on ARCH
  true
}
adjust_os() {
  # adjust archive name based on OS
  true
}
adjust_arch() {
  # adjust archive name based on ARCH
  true
}

cat /dev/null <<EOF
------------------------------------------------------------------------
https://github.com/client9/shlib - portable posix shell functions
Public domain - http://unlicense.org
https://github.com/client9/shlib/blob/master/LICENSE.md
but credit (and pull requests) appreciated.
------------------------------------------------------------------------
EOF
is_command() {
  command -v "$1" >/dev/null
}
uname_os() {
  # Optional override for unusual environments (CI, embedded shells, etc.)
  if [ -n "${DIODE_OS:-}" ]; then
    echo "${DIODE_OS}" | tr '[:upper:]' '[:lower:]'
    return
  fi

  # Native Windows build (diode.exe) while shell is WSL/Git-Bash edge cases.
  # Same as DIODE_OS=windows — use when cmd.exe runs WSL bash but Diode runs on Windows.
  case "${DIODE_WINDOWS:-}" in
    1 | yes | true | TRUE) echo "windows"; return ;;
  esac

  # Git Bash / MSYS2 / Cygwin: uname -s can vary; uname -o is reliable here.
  # On real Linux/macOS, uname -o is typically GNU/Linux or Darwin, not msys/cygwin.
  case "$(uname -o 2>/dev/null | tr '[:upper:]' '[:lower:]')" in
    msys | cygwin) echo "windows"; return ;;
  esac

  os=$(uname -s | tr '[:upper:]' '[:lower:]')
  case $os in
    msys*) os="windows" ;;
    mingw*) os="windows" ;;
    cygwin*) os="windows" ;;
  esac
  echo "${os}"
}
uname_arch() {
  arch=$(uname -m)
  case $arch in
    x86_64) arch="amd64" ;;
    x86) arch="386" ;;
    i686) arch="386" ;;
    i386) arch="386" ;;
    aarch64) arch="arm64" ;;
    armv5*) arch="arm" ;;
    armv6*) arch="arm" ;;
    armv7*) arch="arm" ;;
  esac
  echo ${arch}
}
uname_os_check() {
  os=$(uname_os)
  case "$os" in
    darwin) return 0 ;;
    dragonfly) return 0 ;;
    freebsd) return 0 ;;
    linux) return 0 ;;
    android) return 0 ;;
    nacl) return 0 ;;
    netbsd) return 0 ;;
    openbsd) return 0 ;;
    plan9) return 0 ;;
    solaris) return 0 ;;
    windows) return 0 ;;
  esac
  echo "$0: uname_os_check: internal error '$(uname -s)' got converted to '$os' which is not a GOOS value. Please file bug at https://github.com/client9/shlib"
  return 1
}
uname_arch_check() {
  arch=$(uname_arch)
  case "$arch" in
    386) return 0 ;;
    amd64) return 0 ;;
    arm64) return 0 ;;
    arm) return 0 ;;
    ppc64) return 0 ;;
    ppc64le) return 0 ;;
    mips) return 0 ;;
    mipsle) return 0 ;;
    mips64) return 0 ;;
    mips64le) return 0 ;;
    s390x) return 0 ;;
    amd64p32) return 0 ;;
  esac
  echo "$0: uname_arch_check: internal error '$(uname -m)' got converted to '$arch' which is not a GOARCH value.  Please file bug report at https://github.com/client9/shlib"
  return 1
}
untar() {
  tarball=$1
  case "${tarball}" in
    *.tar.gz | *.tgz) tar -xzf "${tarball}" ;;
    *.tar) tar -xf "${tarball}" ;;
    *.zip)
      # Git Bash on Windows often lacks unzip; bsdtar/GNU tar can extract zips.
      if is_command unzip; then
        unzip -o "${tarball}"
      elif tar -xf "${tarball}" 2>/dev/null; then
        :
      else
        echo "untar: need unzip or tar with zip support to extract ${tarball}"
        if [ -r /proc/version ] && grep -qi microsoft /proc/version 2>/dev/null; then
          echo "untar: on WSL, install unzip in your distro, e.g.: sudo apt-get update && sudo apt-get install -y unzip"
        fi
        return 1
      fi
      ;;
    *)
      echo "Unknown archive format for ${tarball}"
      return 1
      ;;
  esac
}
mktmpdir() {
  test -z "$TMPDIR" && TMPDIR="$(mktemp -d)"
  mkdir -p "${TMPDIR}"
  echo "${TMPDIR}"
}
http_download() {
  local_file=$1
  source_url=$2
  header=$3
  headerflag=''
  destflag=''
  if is_command curl; then
    cmd='curl --retry 3 --fail -sSL'
    destflag='-o'
    headerflag='-H'
  elif is_command wget; then
    cmd='wget -q'
    destflag='-O'
    headerflag='--header'
  else
    echo "http_download: unable to find wget or curl"
    return 1
  fi
  if [ -z "$header" ]; then
    $cmd $destflag "$local_file" "$source_url"
  else
    $cmd $headerflag "$header" $destflag "$local_file" "$source_url"
  fi
}
github_api() {
  local_file=$1
  source_url=$2
  header=""
  case "$source_url" in
    https://api.github.com*)
      test -z "$GITHUB_TOKEN" || header="Authorization: token $GITHUB_TOKEN"
      ;;
  esac
  http_download "$local_file" "$source_url" "$header"
}
github_last_release() {
  owner_repo=$1
  giturl="https://api.github.com/repos/${owner_repo}/releases/latest"
  html=$(github_api - "$giturl")
  version=$(echo "$html" | tr ',' '\n' | grep -m 1 "\"tag_name\":" | cut -f4 -d'"')
  test -z "$version" && return 1
  echo "$version"
}
hash_sha256() {
  TARGET=${1:-/dev/stdin}
  if is_command gsha256sum; then
    hash=$(gsha256sum "$TARGET") || return 1
    echo "$hash" | cut -d ' ' -f 1
  elif is_command sha256sum; then
    hash=$(sha256sum "$TARGET") || return 1
    echo "$hash" | cut -d ' ' -f 1
  elif is_command shasum; then
    hash=$(shasum -a 256 "$TARGET" 2>/dev/null) || return 1
    echo "$hash" | cut -d ' ' -f 1
  elif is_command openssl; then
    hash=$(openssl -dst openssl dgst -sha256 "$TARGET") || return 1
    echo "$hash" | cut -d ' ' -f a
  else
    echo "hash_sha256: unable to find command to compute sha-256 hash"
    return 1
  fi
}
hash_sha256_verify() {
  TARGET=$1
  checksums=$2
  if [ -z "$checksums" ]; then
    echo "hash_sha256_verify: checksum file not specified in arg2"
    return 1
  fi
  BASENAME=${TARGET##*/}
  want=$(grep "${BASENAME}" "${checksums}" 2>/dev/null | tr '\t' ' ' | cut -d ' ' -f 1)
  if [ -z "$want" ]; then
    echo "hash_sha256_verify: unable to find checksum for '${TARGET}' in '${checksums}'"
    return 1
  fi
  got=$(hash_sha256 "$TARGET")
  if [ "$want" != "$got" ]; then
    echo "hash_sha256_verify: checksum for '$TARGET' did not verify ${want} vs $got"
    return 1
  fi
}
cat /dev/null <<EOF
------------------------------------------------------------------------
End of functions from https://github.com/client9/shlib
------------------------------------------------------------------------
EOF

OWNER=diodechain
REPO=diode_go_client
BINARY=diode
FORMAT=zip
OS=$(uname_os)
ARCH=$(uname_arch)
PREFIX="$OWNER/$REPO"
PLATFORM="${OS}/${ARCH}"
GITHUB_DOWNLOAD=https://github.com/${OWNER}/${REPO}/releases/download

uname_os_check "$OS"
uname_arch_check "$ARCH"

parse_args "$@"

check_platform

adjust_version

adjust_format

adjust_os

adjust_arch

BINDIR_EXPANDED=$(expand_bindir "$BINDIR")

if wsl_detected && [ "$OS" = "linux" ] && [ -z "${DIODE_OS:-}" ] && [ -z "${DIODE_WINDOWS:-}" ] && [ -z "${DIODE_SKIP_WINDOWS_EXE:-}" ]; then
  echo "$PREFIX: WSL detected: installing Linux ${ARCH} CLI and Windows diode.exe (under your Windows user folder)"
  echo "$PREFIX: found version ${VERSION} for linux/${ARCH} (+ windows/${ARCH} companion)"
  install_one_platform linux "$ARCH" "$BINDIR" || exit 1
  append_shell_path "$BINDIR_EXPANDED"
  if [ "$ARCH" = "amd64" ] || [ "$ARCH" = "386" ]; then
    WUSER=$(windows_username_for_wsl)
    if [ -n "${BINDIR_WINDOWS:-}" ]; then
      WBIND_RAW="$BINDIR_WINDOWS"
    else
      WBIND_RAW="/mnt/c/Users/${WUSER}/opt/diode"
    fi
    if [ -d "/mnt/c/Users/${WUSER}" ]; then
      install_one_platform windows "$ARCH" "$WBIND_RAW" || echo "$PREFIX: warning: Windows diode.exe install failed (Linux CLI is installed)."
      WEXP=$(expand_bindir "$WBIND_RAW")
      if command -v wslpath >/dev/null 2>&1 && [ -d "$WEXP" ]; then
        WP=$(wslpath -w "$WEXP" 2>/dev/null) && echo "$PREFIX: Windows: add this folder to PATH for cmd.exe/PowerShell: $WP"
      fi
    else
      echo "$PREFIX: warning: /mnt/c/Users/${WUSER} not found; skipping Windows diode.exe."
    fi
  else
    echo "$PREFIX: note: only amd64/386 Windows builds are published; skipping Windows diode.exe."
  fi
else
  echo "$PREFIX: found version ${VERSION} for ${OS}/${ARCH}"
  install_one_platform "$OS" "$ARCH" "$BINDIR" || exit 1
  append_shell_path "$BINDIR_EXPANDED"
fi
