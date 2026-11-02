#!/usr/bin/env bash
# verify-openevidence: prove a change works in the real app, then tear it down.
# Usage: ./scripts/verify.sh [--keep-open]
set -euo pipefail
cd "$(dirname "$0")/.."
exec python3 "$HOME/.hermes/scripts/verify_app.py" --repo "$PWD" "$@"
