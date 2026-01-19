// shared/index.ts
// Barrel file for shared imports

// Types
export * from './types/models';
export * from './types/api';
export * from './types/errorTypes';
export * from './interfaces/User';

// Validators
export { signupRequestSchema } from './validators/signupRequestSchema';
export { loginRequestSchema } from './validators/loginRequestSchema';
export { logoutRequestSchema } from './validators/logoutRequestSchema';
export { updateUserRequestSchema } from './validators/updateUserRequestSchema';

// Utils
export * from './utils/constants';
export * from './utils/format';
export * from './utils/errorNormalizer';

// API Client
export * from './api/apiClient';
