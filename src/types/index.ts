export enum AssetType {
  LiveWebinar = 'Live Webinar',
  OnDemandWebinar = 'On-Demand Webinar',
  Whitepaper = 'Whitepaper',
  OnDemandPodcast = 'on-demand podcast',
}

export interface LeadGenAsset {
  id: string;
  name: string;
  description: string;
  executionDate?: Date;
  expirationDate?: Date;
  sponsorName: string;
  assetType: AssetType;
  category: string;
  tags: string[];
  speakers?: Person[];
  createdDate: Date;
  createdBy: string;
  lastModifiedDate: Date;
  lastModifiedBy: string;
}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  companyName: string;
  email: string;
}

export interface SignUpPayload {
  id: string;
  person: Person;
  signupDate: Date;
  assetId: string;
}

export interface ApiResponse<T> {
  data: T;
}

export interface ApiError {
  error: string;
}
