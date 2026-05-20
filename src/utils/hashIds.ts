import { createHash } from 'crypto';
import { LeadGenAsset, Person, SignUpPayload } from '../types';

function sha256(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

export function hashLeadGenAssetId(asset: Pick<LeadGenAsset, 'name' | 'sponsorName' | 'assetType'>): string {
  return sha256(`${asset.name}${asset.sponsorName}${asset.assetType}`);
}

export function hashPersonId(person: Pick<Person, 'firstName' | 'lastName' | 'email'>): string {
  return sha256(`${person.firstName}${person.lastName}${person.email}`);
}

export function hashSignUpPayloadId(signup: Pick<SignUpPayload, 'assetId' | 'person'>): string {
  return sha256(`${signup.assetId}${signup.person.id}`);
}
