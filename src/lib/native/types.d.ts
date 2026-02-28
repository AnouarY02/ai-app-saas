// ============================================================
// VOLT Sleep — Type Declarations for Capacitor Plugins
// ============================================================
// These plugins are installed when native platforms are added.
// Type stubs prevent TS errors during web-only development.
// Install actual packages before native builds:
//   npm install @capacitor/core @capacitor/app @capacitor/haptics
//   npm install @capacitor/push-notifications @capacitor/local-notifications
//   npm install @capacitor/preferences @capacitor/keyboard @capacitor/status-bar
//   npm install @capacitor-community/in-app-purchases
//   npm install @capacitor-community/calendar
//   npm install capacitor-rate-app
// ============================================================

declare module '@capacitor/core' {
  export const Capacitor: {
    isNativePlatform(): boolean
    getPlatform(): string
  }
}

declare module '@capacitor/app' {
  export const App: {
    addListener(event: string, callback: (data: any) => void): any
    minimizeApp(): Promise<void>
  }
}

declare module '@capacitor/haptics' {
  export const Haptics: {
    impact(options: { style: any }): Promise<void>
    notification(options: { type: any }): Promise<void>
  }
  export enum ImpactStyle { Light = 'LIGHT', Medium = 'MEDIUM', Heavy = 'HEAVY' }
  export enum NotificationType { Success = 'SUCCESS', Warning = 'WARNING', Error = 'ERROR' }
}

declare module '@capacitor/push-notifications' {
  export const PushNotifications: {
    requestPermissions(): Promise<{ receive: string }>
    register(): Promise<void>
    addListener(event: string, callback: (data: any) => void): any
  }
}

declare module '@capacitor/local-notifications' {
  export const LocalNotifications: {
    schedule(options: { notifications: any[] }): Promise<void>
  }
}

declare module '@capacitor/preferences' {
  export const Preferences: {
    get(options: { key: string }): Promise<{ value: string | null }>
    set(options: { key: string; value: string }): Promise<void>
    remove(options: { key: string }): Promise<void>
  }
}

declare module '@capacitor-community/in-app-purchases' {
  export const InAppPurchases: {
    initialize(): Promise<void>
    getProducts(options: { productIds: string[] }): Promise<{ products: any[] }>
    purchaseProduct(options: { productId: string }): Promise<any>
    restorePurchases(): Promise<{ purchases: any[] }>
  }
}

declare module '@capacitor-community/calendar' {
  export const Calendar: {
    requestPermissions(): Promise<{ readCalendar: string; writeCalendar: string }>
    createEvent(options: any): Promise<void>
  }
}

declare module '@nicoriera/capacitor-healthkit' {
  export const CapacitorHealthkit: {
    requestAuthorization(options: { read: string[]; write: string[] }): Promise<{ granted: boolean }>
    queryHKitSampleType(options: any): Promise<{ resultData: any[] }>
  }
}

declare module '@nicoriera/capacitor-google-fit' {
  export const GoogleFit: {
    connectToGoogleFit(): Promise<void>
    getSleepData(options: { startDate: string; endDate: string }): Promise<{ sessions: any[] }>
  }
}

declare module 'capacitor-rate-app' {
  export const RateApp: {
    requestReview(): Promise<void>
  }
}
