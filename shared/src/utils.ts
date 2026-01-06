// shared/src/utils.ts

/**
 * isObject: Checks if a value is a non-null object.
 */
export function isObject(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && val !== null;
}

/**
 * pick: Returns a shallow copy of an object with only the specified keys.
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const out = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      out[key] = obj[key];
    }
  }
  return out;
}

/**
 * sleep: Returns a promise that resolves after the given milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
