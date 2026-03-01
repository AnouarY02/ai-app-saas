import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'nl.voltsleep.app',
  appName: 'VOLT Sleep',
  webDir: 'out',
  // Server configuration for connecting to the web app
  server: {
    // In production, use the bundled web assets
    // In development, connect to the local dev server
    ...(process.env.NODE_ENV === 'development'
      ? { url: 'http://localhost:3000', cleartext: true }
      : {}),
    // Allow navigation to Stripe checkout and Supabase auth
    allowNavigation: [
      'checkout.stripe.com',
      '*.supabase.co',
      'voltsleep.nl',
    ],
  },
  plugins: {
    // Push Notifications
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    // Deep Linking (Universal Links / App Links)
    // iOS: Associated Domains in Xcode
    // Android: assetlinks.json on server
    // Deep link pattern: voltsleep.nl/app/*
    // Custom scheme: voltsleep://
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: '#0A0A0A',
      showSpinner: false,
      androidScaleType: 'CENTER_CROP',
      splashFullScreen: true,
      splashImmersive: true,
    },
    Keyboard: {
      resize: 'body' as any,
      style: 'dark' as any,
    },
    StatusBar: {
      style: 'dark' as any,
      backgroundColor: '#0A0A0A',
    },
    // Haptics — used for check-in confirmations and streak milestones
    Haptics: {},
  },
  // iOS-specific
  ios: {
    scheme: 'VOLT Sleep',
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    backgroundColor: '#0A0A0A',
  },
  // Android-specific
  android: {
    backgroundColor: '#0A0A0A',
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false,
  },
}

export default config
