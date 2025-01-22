export interface Challenge {
  _id: string;
  name: string;
  category: string;
  description: string;
  points: number;
  author: string;
  file_url: string;
}

export interface CategoryGroup {
  category: string;
  challenges: Challenge[];
}
