import { Team } from "@/utils/types/team";

export interface User extends UserMinified {
  password: string;
  role: number;
  team: Team;
  token: string;
  createdAt: Date;
}

export interface UserMinified {
  email: string;
  points: number;
  username: string;
  _id: string;
}
