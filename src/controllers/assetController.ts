import { Request, Response } from "express";
import * as assetService from "../services/assetService";
import { ApiError, ApiResponse, LeadGenAsset, Person, SignUpPayload } from "../types";

export async function lookupPerson(
  req: Request,
  res: Response<ApiResponse<Person> | ApiError>
): Promise<void> {
  const email = req.query.email as string;
  if (!email) {
    res.status(400).json({ error: "email query parameter is required" });
    return;
  }
  const person = await assetService.lookupPersonByEmail(email);
  if (!person) {
    res.status(404).json({ error: "Person not found" });
    return;
  }
  res.json({ data: person });
}

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
