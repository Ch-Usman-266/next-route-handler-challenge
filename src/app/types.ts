export interface Record {
  id: number;
  title: string;
  description: string;
  grades: string[];
}
export type SearchTerm = string | '';

export type FilterValue = '3-5' | '6-8' | '9-12';
