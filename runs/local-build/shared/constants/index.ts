export const SETTINGS_KEYS = {
  THEME: 'theme',
  NOTIFICATIONS: 'notifications',
  LANGUAGE: 'language',
} as const;

export type SettingsKey = typeof SETTINGS_KEYS[keyof typeof SETTINGS_KEYS];

