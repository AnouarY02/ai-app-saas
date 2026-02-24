export interface FeatureFlag {
  id: string;
  key: string;
  label: string;
  description: string;
  enabled: boolean;
  roles: ("admin" | "medewerker")[];
  updatedAt: string;
}

export const featureFlagStore = new Map<string, FeatureFlag>();

export const defaultFeatureFlags: FeatureFlag[] = [
  {
    id: "flag-rapportage",
    key: "ai_rapportage",
    label: "Rapportage",
    description: "AI-gegenereerde dagrapportages voor clienten",
    enabled: true,
    roles: ["admin", "medewerker"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "flag-zorgplan",
    key: "ai_zorgplan",
    label: "Zorgplan",
    description: "AI-ondersteuning bij het opstellen van zorgplannen",
    enabled: true,
    roles: ["admin", "medewerker"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "flag-risicosignalering",
    key: "ai_risicosignalering",
    label: "Risicosignalering",
    description: "AI-analyse van risicosignalen bij clienten",
    enabled: true,
    roles: ["admin", "medewerker"],
    updatedAt: new Date().toISOString(),
  },
  {
    id: "flag-signaleringplan",
    key: "ai_signaleringplan",
    label: "Signaleringsplan",
    description: "AI-ondersteuning bij het maken van signalerings- en crisisplannen",
    enabled: true,
    roles: ["admin", "medewerker"],
    updatedAt: new Date().toISOString(),
  },
];
