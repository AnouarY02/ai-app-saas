# Shared Layer for TaskManager

This directory contains all types, schemas, constants, and utilities shared between the frontend and backend of the TaskManager app.

## Contents
- **types/**: TypeScript interfaces for User, Task, API contracts, and error types
- **validators/**: Zod schemas for validating API requests and parameters
- **utils/**: Date and validation helpers
- **constants.ts**: Project-wide constants (e.g., task statuses, field limits)
- **index.ts**: Barrel file for stable imports

## Usage
Import from `@ai-app-saas/shared` in both frontend and backend for type safety and consistent validation.
