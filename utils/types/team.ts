import { UserMinified } from "@/utils/types/user";
import { Challenge } from "@/utils/types/challenge";

export interface Team {
  captain: UserMinified;
  name: string;
  players: UserMinified[];
  points: number;
  token: string;
  tried_challenges: Challenge[];
  _id: string;
}
