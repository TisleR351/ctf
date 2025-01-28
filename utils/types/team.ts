import { UserMinified } from "@/utils/types/user";
import { Challenge } from "@/utils/types/challenge";

export interface Team {
  captain: UserMinified;
  name: string;
  players: UserMinified[];
  points: number;
  token: string;
  ranking: string;
  tried_challenges: {
    challenge_id: string;
    flag: false | string;
    attempts: number;
  }[];
  _id: string;
}

export interface TeamMongoDB {
  name: string;
  captain: string;
  players: string[];
  points: number;
  tried_challenges?: string[];
  token?: string;
}

export interface TeamMongoDBWithRanking extends TeamMongoDB {
  ranking: number;
}
