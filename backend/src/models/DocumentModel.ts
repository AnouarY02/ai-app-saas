export interface OrgDocument {
  id: string;
  name: string;
  originalName: string;
  mimeType: string;
  size: number;
  content: string;
  uploadedBy: string;
  createdAt: string;
}

export const documentStore = new Map<string, OrgDocument>();
