# Infra Layer

This directory contains configuration and tooling for the monorepo.

- **eslint.json**: ESLint configuration for code linting
- **prettier.config.js**: Prettier configuration for code formatting
- **.gitignore**: Ignore rules for the repository
- **frontend.Dockerfile**: Dockerfile for the frontend (React/Vite)
- **backend.Dockerfile**: Dockerfile for the backend (Express/TypeScript)

## Usage
- All infra scripts and configs are referenced from the root or respective Dockerfiles.
- For local development, use `docker-compose.yml` at the root.
