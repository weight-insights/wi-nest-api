export class Game {
  gameId: string;
  adminId: string;
  name: string;
  active: boolean;
  info: string;
  startDate: string;
  gameTimeZone: string;
  gameLength: number; // total number of weight events, including the first and final
  gamePeriod: number; // number of days between weight events, standard of 7 (1 week)
  minWeightLoss: number;
  weightUnit: string;
  fee: number;
  currency: string;
  vacationLength: number;

  constructor(partial: Partial<Game>) {
    Object.assign(this, partial);
  }
}
