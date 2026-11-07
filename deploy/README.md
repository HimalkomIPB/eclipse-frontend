# Deployment (Coolify, GitHub push webhook)

Coolify builds `Dockerfile` from this repo and deploys automatically on push:

| Branch | Site |
|---|---|
| `main` | https://himalkom-ipb.com |
| `staging` | https://staging.himalkom-ipb.com |

- Build-time variable: `VITE_API_BASE_URL` (public API origin without `/api`), set in Coolify.
- Container listens on port 8080 (nginx, SPA fallback to `/index.html`).
- Test changes on `staging` first, then merge into `main`.
- Add `[skip ci]` to a commit message to skip the Coolify deploy.
