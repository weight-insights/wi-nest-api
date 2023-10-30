import { Member } from 'src/members/member.entity';

export class Game {
  gameId: string;
  adminId: string;
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

  constructor(partial: Partial<Game>) {
    Object.assign(this, partial);
  }
}
