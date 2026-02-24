import { Request, Response, NextFunction } from "express";
import { userStore, User } from "../models/UserModel";
import { brandingStore } from "../models/BrandingModel";
import { documentStore, OrgDocument } from "../models/DocumentModel";
import { featureFlagStore } from "../models/FeatureFlagModel";
import { organisationFormatStore, OrganisationFormat } from "../models/OrganisationFormatModel";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export class AdminController {
  // --- Medewerkers ---
  listUsers(_req: Request, res: Response) {
    const users = Array.from(userStore.values()).map(({ passwordHash: _, ...u }) => u);
    res.json(users);
  }

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Naam, email en wachtwoord zijn verplicht" });
      }
      for (const u of userStore.values()) {
        if (u.email === email) return res.status(400).json({ message: "Email al in gebruik" });
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const id = uuidv4();
      const now = new Date().toISOString();
      const user: User = { id, name, email, passwordHash, role: role || "medewerker", active: true, createdAt: now, updatedAt: now };
      userStore.set(id, user);
      const { passwordHash: _, ...safeUser } = user;
      res.status(201).json(safeUser);
    } catch (err) { next(err); }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = userStore.get(id);
      if (!user) return res.status(404).json({ message: "Medewerker niet gevonden" });
      const { name, email, role, active, password } = req.body;
      const updated: User = {
        ...user,
        name: name ?? user.name,
        email: email ?? user.email,
        role: role ?? user.role,
        active: active ?? user.active,
        passwordHash: password ? await bcrypt.hash(password, 10) : user.passwordHash,
        updatedAt: new Date().toISOString(),
      };
      userStore.set(id, updated);
      const { passwordHash: _, ...safeUser } = updated;
      res.json(safeUser);
    } catch (err) { next(err); }
  };

  deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    if (!userStore.has(id)) return res.status(404).json({ message: "Niet gevonden" });
    userStore.delete(id);
    res.json({ message: "Verwijderd" });
  }

  // --- Branding ---
  getBranding(_req: Request, res: Response) {
    const branding = brandingStore.get("default");
    res.json(branding);
  }

  updateBranding(req: Request, res: Response) {
    const existing = brandingStore.get("default");
    const updated = { ...existing, ...req.body, id: "default", updatedAt: new Date().toISOString() };
    brandingStore.set("default", updated);
    res.json(updated);
  }

  // --- Documenten ---
  listDocuments(_req: Request, res: Response) {
    const docs = Array.from(documentStore.values());
    res.json(docs);
  }

  uploadDocument = (req: Request, res: Response) => {
    const { name, content, mimeType } = req.body;
    if (!name || !content) return res.status(400).json({ message: "Naam en inhoud zijn verplicht" });
    const id = uuidv4();
    const user = req.user as any;
    const doc: OrgDocument = {
      id, name, originalName: name,
      mimeType: mimeType || "text/plain",
      size: content.length,
      content,
      uploadedBy: user?.id || "unknown",
      createdAt: new Date().toISOString(),
    };
    documentStore.set(id, doc);
    res.status(201).json(doc);
  };

  deleteDocument(req: Request, res: Response) {
    const { id } = req.params;
    if (!documentStore.has(id)) return res.status(404).json({ message: "Document niet gevonden" });
    documentStore.delete(id);
    res.json({ message: "Verwijderd" });
  }

  // --- Feature Flags ---
  listFlags(_req: Request, res: Response) {
    const flags = Array.from(featureFlagStore.values());
    res.json(flags);
  }

  updateFlag(req: Request, res: Response) {
    const { id } = req.params;
    const flag = featureFlagStore.get(id);
    if (!flag) return res.status(404).json({ message: "Feature flag niet gevonden" });
    const updated = { ...flag, ...req.body, id, updatedAt: new Date().toISOString() };
    featureFlagStore.set(id, updated);
    res.json(updated);
  }

  // --- Organisatieformats ---
  listFormats(_req: Request, res: Response) {
    const formats = Array.from(organisationFormatStore.values());
    res.json(formats);
  }

  getFormat(req: Request, res: Response) {
    const { id } = req.params;
    const format = organisationFormatStore.get(id);
    if (!format) return res.status(404).json({ message: "Format niet gevonden" });
    res.json(format);
  }

  updateFormat(req: Request, res: Response) {
    const { id } = req.params;
    const format = organisationFormatStore.get(id);
    if (!format) return res.status(404).json({ message: "Format niet gevonden" });
    const updated: OrganisationFormat = {
      ...format,
      ...req.body,
      id,
      key: format.key,
      updatedAt: new Date().toISOString(),
    };
    organisationFormatStore.set(id, updated);
    res.json(updated);
  }
}
