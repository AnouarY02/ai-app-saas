// Shared validators

/**
 * emptyObjectSchema: Validates that an object is empty (no own properties)
 * Throws an error if validation fails.
 * Returns void if valid.
 */
export function emptyObjectSchema(obj: unknown): void {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    throw new Error('Expected an empty object');
  }
  if (Object.keys(obj).length !== 0) {
    throw new Error('Expected an empty object');
  }
}
