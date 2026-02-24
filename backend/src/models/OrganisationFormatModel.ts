export interface OrganisationFormat {
  id: string;
  key: string;
  name: string;
  description: string;
  template: string;
  updatedAt: string;
}

export const organisationFormatStore = new Map<string, OrganisationFormat>();

export const defaultOrganisationFormats: OrganisationFormat[] = [
  {
    id: "format-default",
    key: "default",
    name: "Standaard",
    description: "Basis outputformat voor rapportages en plannen",
    template: "Datum: {datum}\nMedewerker: {medewerker}\n\n{inhoud}",
    updatedAt: new Date().toISOString(),
  },
];
