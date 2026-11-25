# Production image for the React SPA, built by GitHub Actions (.github/workflows/build-and-deploy.yml, build context = repo root).
# VITE_API_BASE_URL is baked in at build time (the workflow passes it as a build arg from the GitHub environment variable).
FROM node:20-alpine AS build
ARG VITE_API_BASE_URL
RUN test -n "$VITE_API_BASE_URL"
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts --no-audit --no-fund
COPY . ./
RUN rm -rf dist .env* && VITE_API_BASE_URL="$VITE_API_BASE_URL" npm run build

FROM nginx:1.27-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s CMD wget -q -O /dev/null http://127.0.0.1:8080/ || exit 1
