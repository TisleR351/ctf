import { UserMinified } from "@/utils/types/user";
import { Challenge } from "@/utils/types/challenge";
import { ObjectId } from "mongodb";

export interface Team {
  captain: UserMinified;
  name: string;
  players: UserMinified[];
  points: number;
  token: string;
  tried_challenges: Challenge[];
  _id: string;
}

export interface TeamMongoDB {
  captain: string;
  name: string;
  players: string[];
  points: number;
  token: string;
  tried_challenges: string[];
  _id: ObjectId;
}
