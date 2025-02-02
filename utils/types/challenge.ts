import { ObjectId } from "mongodb";

export interface Challenge {
  _id: string;
  name: string;
  category: string;
  description: string;
  points: number;
  author: string;
  flag: string[];
  file_url: string;
  teamsSucceededCount: string;
  successPercentage: string;
}

export interface ChallengeMongoDB {
  _id?: ObjectId;
  name: string;
  category: string;
  description: string;
  points: number;
  author: string;
  flag: string[];
  file_url: string;
}

export interface CategoryGroup {
  category: string;
  challenges: Challenge[];
}
