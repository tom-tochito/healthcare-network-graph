export interface HCP {
  id: string;
  name: string;
  title?: string;
  organization?: string;
  specialization?: string;
  location?: string;
  profileImage?: string;
  peers: number;
  following: number;
  successRate?: number;
  patientServed?: number;
  education?: Education[];
  workExperience?: WorkExperience[];
  publications?: Publication[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  year: string;
  logoUrl?: string;
}

export interface WorkExperience {
  position: string;
  organization: string;
  startYear: string;
  endYear?: string;
  current?: boolean;
}

export interface Publication {
  id: string;
  title: string;
  type: 'book' | 'journal' | 'conference' | 'other';
  year: string;
  journal?: string;
  coAuthors?: string[];
}

export interface NetworkNode extends HCP {
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

export interface NetworkLink {
  source: string;
  target: string;
  type: 'co-author' | 'colleague' | 'education' | 'institution';
  strength: number;
  label?: string;
  publications?: number;
  sharedInstitution?: string;
}

export interface NetworkData {
  nodes: NetworkNode[];
  links: NetworkLink[];
}