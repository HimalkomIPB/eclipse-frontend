# Deployment (GitHub Actions build, Coolify runs the image)

On push, `.github/workflows/build-and-deploy.yml` builds `Dockerfile` on GitHub's runners, pushes it to
`ghcr.io/himalkomipb/eclipse-frontend`, then calls the Coolify deploy API.
The VPS never builds; Coolify's "Docker Image" apps only pull and restart.

| Branch | Image tag | GitHub environment | Site |
|---|---|---|---|
| `main` | `:main` | `production` | https://himalkom-ipb.com |
| `staging` | `:staging` | `staging` | https://staging.himalkom-ipb.com |

Each GitHub environment holds three secrets: `COOLIFY_URL`, `COOLIFY_TOKEN` (Coolify API token
with deploy permission), `COOLIFY_APP_UUID`. Every build is also tagged `:sha-<commit>` for rollback.

- Build-time variable: `VITE_API_BASE_URL` (public API origin without `/api`), a GitHub environment
  variable (not a secret). It is baked into the bundle, so changing it needs a rebuild.
- The image is built for `linux/arm64` (the VPS is ARM64) on GitHub's `ubuntu-24.04-arm` runners.
- Container listens on port 8080 (nginx, SPA fallback to `/index.html`).
- Test changes on `staging` first, then merge into `main`.
- Add `[skip ci]` to a commit message to skip the build and deploy.
