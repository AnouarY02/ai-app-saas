import { Router } from "express";
import { AIController } from "../controllers/AIController";
import { authenticate } from "../middleware/auth";

const router = Router();
const ctrl = new AIController();

router.use(authenticate);

router.post("/rapportage", ctrl.rapportage);
router.post("/zorgplan", ctrl.zorgplan);
router.post("/risicosignalering", ctrl.risicosignalering);
router.post("/signaleringplan", ctrl.signaleringplan);

export default router;
