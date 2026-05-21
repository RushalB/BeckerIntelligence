import { LeadGenAsset, Person, SignUpPayload } from "../types";
import { hashPersonId, hashSignUpPayloadId } from "../utils/hashIds";
import assetsData from "../data/assets.json";
import signupsData from "../data/signups.json";

const assets: LeadGenAsset[] = assetsData as unknown as LeadGenAsset[];
const signups: SignUpPayload[] = signupsData as unknown as SignUpPayload[];

console.info(`[assetService] Loaded ${assets.length} assets and ${signups.length} signups from stub data`);

export async function listAssets(): Promise<LeadGenAsset[]> {
  console.info(`[assetService] listAssets: returning ${assets.length} assets`);
  return assets;
}

export async function getAssetById(id: string): Promise<LeadGenAsset | null> {
  const asset = assets.find((a) => a.id === id) ?? null;
  if (!asset) {
    console.error(`[assetService] getAssetById: no asset found for id=${id}`);
  } else {
    console.info(`[assetService] getAssetById: found asset id=${id} name="${asset.name}"`);
  }
  return asset;
}

export async function lookupPersonByEmail(email: string): Promise<Person | null> {
  const normalized = email.trim().toLowerCase();
  const match = signups.find(s => s.person.email.toLowerCase() === normalized);
  if (match) {
    console.info(`[assetService] lookupPersonByEmail: found person id=${match.person.id} for email=${normalized}`);
    return match.person;
  }
  console.info(`[assetService] lookupPersonByEmail: no person found for email=${normalized}`);
  return null;
}

export async function signUpForAsset(
  assetId: string,
  person: Person
): Promise<SignUpPayload> {
  const asset = assets.find((a) => a.id === assetId);
  if (!asset) {
    console.error(`[assetService] signUpForAsset: asset not found for assetId=${assetId}`);
  }

  const resolvedPerson: Person = person.id
    ? person
    : { ...person, id: hashPersonId(person) };

  if (!person.id) {
    console.info(`[assetService] signUpForAsset: no person id provided, generated id=${resolvedPerson.id}`);
  }

  const signup: SignUpPayload = {
    id: hashSignUpPayloadId({ assetId, person: resolvedPerson }),
    person: resolvedPerson,
    signupDate: new Date(),
    assetId,
  };

  signups.push(signup);
  console.info(`[assetService] signUpForAsset: created signup id=${signup.id} for person id=${resolvedPerson.id} on assetId=${assetId}`);
  return signup;
}
