# Infrastructure & Developer Experience

## Overview
This directory contains configuration and tooling for code quality, Docker, and developer workflow.

## Files
- `.eslintrc.json` – Monorepo-wide ESLint config
- `.prettierrc` – Prettier formatting rules
- `.gitignore` – Ignore files for all layers
- `docker-compose.yml` – Compose setup for frontend and backend
- `Dockerfile.backend` – Backend container build
- `Dockerfile.frontend` – Frontend container build

## Usage
- Use `yarn start` at the repo root to run all services via Docker Compose
- Use `yarn lint` and `yarn format` for code quality

## Customization
- Adjust Dockerfiles as needed for production
- Add more services (e.g. database) to `docker-compose.yml` as the project grows
