import { Router } from "express";
import { AdminController } from "../controllers/AdminController";
import { authenticate, requireAdmin } from "../middleware/auth";

const router = Router();
const ctrl = new AdminController();

router.use(authenticate, requireAdmin);

// Medewerkers
router.get("/users", ctrl.listUsers.bind(ctrl));
router.post("/users", ctrl.createUser);
router.put("/users/:id", ctrl.updateUser);
router.delete("/users/:id", ctrl.deleteUser.bind(ctrl));

// Branding
router.get("/branding", ctrl.getBranding.bind(ctrl));
router.put("/branding", ctrl.updateBranding.bind(ctrl));

// Documenten
router.get("/documents", ctrl.listDocuments.bind(ctrl));
router.post("/documents", ctrl.uploadDocument);
router.delete("/documents/:id", ctrl.deleteDocument.bind(ctrl));

// Feature flags
router.get("/flags", ctrl.listFlags.bind(ctrl));
router.put("/flags/:id", ctrl.updateFlag.bind(ctrl));

// Organisatieformats
router.get("/formats", ctrl.listFormats.bind(ctrl));
router.get("/formats/:id", ctrl.getFormat.bind(ctrl));
router.put("/formats/:id", ctrl.updateFormat.bind(ctrl));

export default router;
