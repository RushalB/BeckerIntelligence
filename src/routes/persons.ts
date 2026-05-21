import { Router } from "express";
import * as assetController from "../controllers/assetController";

const router = Router();

// GET /persons/lookup?email=... — look up a known person by email
router.get("/lookup", assetController.lookupPerson);

export default router;
