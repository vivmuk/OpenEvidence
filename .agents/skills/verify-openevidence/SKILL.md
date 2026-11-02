---
name: verify-openevidence
description: Launch openevidence and prove a change actually works — real server, real browser, DOM and console assertions, screenshots. Use before claiming any openevidence change is done.
---

# Verify openevidence

Run this before you say "openevidence is done". It starts the app on a free port, waits
for it to answer, checks the routes render, fails on console errors and horizontal
overflow, and writes screenshots you can look at.

```bash
./scripts/verify.sh
```

- Exit 0 = verified. Exit non-zero = the change is not proven, whatever the diff looks like.
- Artifacts land in `.verify/artifacts/`: `desktop.png`, `phone.png`, `server.log`.
- If the app itself is broken before your change, `server.log` says so — read it, fix that first.

## What it asserts

- `/` returns 200

## Extending it

Edit `.verify/verify.json`. Add a `checks` entry with the route and the DOM proof
for the feature you touched (`{"path": "/x", "status": 200, "dom": [{"selector": ".thing", "min": 1}], "consoleClean": true}`).
A check that cannot fail is not a check — assert on something the feature must create.

Do not delete a failing check to get a green run. Fix the app, or fix the
assertion when the contract genuinely changed.
