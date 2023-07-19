import { Member } from 'src/members/member.entity';

export class Game {
  id: number;
  admin: number;
  name: string;
  active: boolean;
  info: string;
  dates: string[];
  minWeightLoss: number;
  weightUnit: string;
  fee: number;
  currency: string;
  vacationLength: number;
  members: Member[];
}
