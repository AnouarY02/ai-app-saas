export interface Branding {
  id: string;
  orgName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoUrl: string;
  faviconUrl: string;
  updatedAt: string;
}

export const brandingStore = new Map<string, Branding>();

export const defaultBranding: Branding = {
  id: "default",
  orgName: "Zorg AI Assistent",
  primaryColor: "#2563eb",
  secondaryColor: "#7c3aed",
  accentColor: "#059669",
  logoUrl: "",
  faviconUrl: "",
  updatedAt: new Date().toISOString(),
};
