# Shared Layer for ai-app

This directory contains all shared types, validators, error codes, logging utilities, and the API client for both frontend and backend.

## Structure
- `types/` — TypeScript interfaces for users, sessions, auth, and API responses
- `validators/` — Zod schemas for validating API requests
- `errorTypes/` — Standardized error codes and error class
- `utils/logger.ts` — Simple logger usable in browser and Node.js
- `apiClient/` — Typed API client for frontend-backend communication

## Usage
Import from `shared` in both frontend and backend for type safety and DRY code.
