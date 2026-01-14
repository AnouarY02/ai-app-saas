// Shared court types and enums
export interface Court {
  id: string;
  name: string;
  location?: string;
  surfaceType?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCourtRequest {
  name: string;
  location?: string;
  surfaceType?: string;
}

export interface UpdateCourtRequest {
  name?: string;
  location?: string;
  surfaceType?: string;
  isActive?: boolean;
}
