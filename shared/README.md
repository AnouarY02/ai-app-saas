# Shared Layer for Test App

This package contains types, validators, and utilities shared between the frontend and backend of the Test App monorepo.

## Exports

- **types.ts**: Shared TypeScript interfaces (e.g., `HealthCheckResponse`)
- **validators.ts**: Simple validation helpers (e.g., `emptyObjectSchema`)
- **utils.ts**: Utility functions (e.g., `getIsoTimestamp`, `logWithTimestamp`)
- **errors.ts**: Shared error codes and helpers

## Usage

Import from the shared package in both frontend and backend:

```ts
import { HealthCheckResponse, emptyObjectSchema, getIsoTimestamp } from '@ai-app-saas/shared';
```
