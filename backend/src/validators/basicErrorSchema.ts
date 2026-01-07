// Placeholder for error schema validation (expand with a library like zod or joi if needed)
export const basicErrorSchema = {
  type: 'object',
  properties: {
    error: { type: 'string' },
    status: { type: 'number' }
  },
  required: ['error', 'status'],
  additionalProperties: false
};
