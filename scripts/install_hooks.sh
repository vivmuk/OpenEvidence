#!/usr/bin/env bash
# Install the OpenEvidence data-integrity git hooks.
#
# Run once per clone:   bash scripts/install_hooks.sh
#
# .git/hooks is not versioned, so the hook source lives in scripts/hooks/ and
# gets copied into place by this script. Re-run after cloning the repo.

set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
SRC="$ROOT/scripts/hooks"
DST="$ROOT/.git/hooks"

[ -d "$SRC" ] || { echo "no hooks found at $SRC" >&2; exit 1; }

chmod +x "$SRC"/* 2>/dev/null || true

for hook in "$SRC"/*; do
  name="$(basename "$hook")"
  cp "$hook" "$DST/$name"
  chmod +x "$DST/$name"
  echo "installed: .git/hooks/$name"
done

echo
echo "Data-integrity gate active. Every commit touching"
echo "data/research.json or data/benchmarks.json will auto-heal and validate."
