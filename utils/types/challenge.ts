export interface Challenge {
  name: string;
  category: string;
  description: string;
  points: number;
  file_url: string;
}

export interface CategoryGroup {
  category: string;
  challenges: Challenge[];
}
