export interface OrganisationFormat {
  id: string;
  key: string;
  /** Koppeling aan AI-module: rapportage, zorgplan, risicosignalering, signaleringsplan */
  moduleKey?: string;
  name: string;
  description: string;
  template: string;
  updatedAt: string;
}

export const organisationFormatStore = new Map<string, OrganisationFormat>();

const defaultTemplate = "Datum: {datum}\nMedewerker: {medewerker}\n\n{inhoud}";

export const defaultOrganisationFormats: OrganisationFormat[] = [
  {
    id: "format-default",
    key: "default",
    name: "Standaard",
    description: "Basis outputformat (fallback)",
    template: defaultTemplate,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "format-rapportage",
    key: "rapportage",
    moduleKey: "rapportage",
    name: "Rapportage",
    description: "Documentstructuur voor dagrapportages",
    template: defaultTemplate,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "format-zorgplan",
    key: "zorgplan",
    moduleKey: "zorgplan",
    name: "Zorgplan",
    description: "Documentstructuur voor zorgplannen",
    template: defaultTemplate,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "format-risicosignalering",
    key: "risicosignalering",
    moduleKey: "risicosignalering",
    name: "Risicosignalering",
    description: "Documentstructuur voor risicosignalering",
    template: defaultTemplate,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "format-signaleringsplan",
    key: "signaleringsplan",
    moduleKey: "signaleringsplan",
    name: "Signaleringsplan",
    description: "Documentstructuur voor signalerings- en crisisplannen",
    template: defaultTemplate,
    updatedAt: new Date().toISOString(),
  },
];
