# Shared Types & Validators

Single source of truth for types between frontend and backend.

## Frontend Usage

```typescript
import { User, LoginRequest, createUserSchema } from '@/shared';
import { apiClient } from '@/utils/apiClient';

const user: User = await apiClient.getUser('123');
const validation = createUserSchema.safeParse(formData);
```

## Backend Usage

```typescript
import { User, createUserSchema } from '@/shared';

export const createUser = async (req: Request, res: Response) => {
  const validated = createUserSchema.parse(req.body);
  // ... implementation
};
```

## Available Exports

- Entity types: User, Insight, etc.
- API types: LoginRequest, CreateUserRequest, etc.
- Common types: ApiResponse, ApiError, PaginatedResponse
- Validators: createUserSchema, updateUserSchema, etc.
- Utils: formatDate, truncate, isValidEmail, etc.
- Constants: API_ROUTES, HTTP_STATUS, ERROR_MESSAGES
