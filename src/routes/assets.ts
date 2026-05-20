import { Router } from "express";
import * as assetController from "../controllers/assetController";

const router = Router();

// GET /assets — list all lead gen assets
router.get("/", assetController.listAssets);

// GET /assets/:id — fetch all data for a specific lead gen asset
router.get("/:id", assetController.getAsset);

// POST /assets/:id/signup — sign up a person for a lead gen asset
router.post("/:id/signup", assetController.signUp);

export default router;
