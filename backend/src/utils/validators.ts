// Placeholder for shared validators (none needed for boilerplate)
// Example: AppConfig schema (not used in this minimal backend)
export const appConfigSchema = {
  type: 'object',
  properties: {
    appName: { type: 'string' },
    buildId: { type: 'string' }
  },
  required: ['appName', 'buildId'],
  additionalProperties: false
};
