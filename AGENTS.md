# openevidence

Working notes for agents in this repo.


## Prove it works before claiming done

Every change runs through the app's own verifier:

```bash
./scripts/verify.sh
```

Non-zero exit means unproven, however good the diff looks. It launches the real
server, checks the routes and DOM, fails on console errors and horizontal
overflow, and leaves screenshots in `.verify/artifacts/` — look at them before
reporting. The skill is `.agents/skills/verify-openevidence/SKILL.md`.
