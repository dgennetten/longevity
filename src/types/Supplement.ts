export interface Supplement {
  id: number;
  name: string;
  dose: string;
  schedule: string;
  rx: boolean;
  description: string;
  primaryProponent: string;
  why: string;
  notes?: string;
  considering?: boolean;
}
