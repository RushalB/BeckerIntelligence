import { Request, Response } from "express";
import * as assetService from "../services/assetService";
import { ApiError, ApiResponse, LeadGenAsset, SignUpPayload } from "../types";

export async function listAssets(
  req: Request,
  res: Response<ApiResponse<LeadGenAsset[]> | ApiError>
): Promise<void> {
  const assets = await assetService.listAssets();
  res.json({ data: assets });
}

export async function getAsset(
  req: Request<{ id: string }>,
  res: Response<ApiResponse<LeadGenAsset> | ApiError>
): Promise<void> {
  const asset = await assetService.getAssetById(req.params.id);
  if (!asset) {
    res.status(404).json({ error: "Asset not found" });
    return;
  }
  res.json({ data: asset });
}

export async function signUp(
  req: Request<{ id: string }, unknown, SignUpPayload>,
  res: Response<ApiResponse<SignUpPayload> | ApiError>
): Promise<void> {
  const { person } = req.body;
  if (!person) {
    res.status(400).json({ error: "person is required" });
    return;
  }
  const signup = await assetService.signUpForAsset(req.params.id, person);
  res.status(201).json({ data: signup });
}
