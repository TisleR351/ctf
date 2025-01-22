export interface User {
  email: string;
  username: string;
  password: string;
  role: number;
  team: string;
  points: number;
  token: string;
  createdAt: Date;
}
