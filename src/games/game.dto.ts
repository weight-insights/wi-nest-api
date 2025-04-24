export interface GameDto {
  gameId: string;
  adminId: string;
  name: string;
  info?: string;
  startDate: string;
  gameLength: number; // total number of weight events, including the first and final
  gameTimeZone: string;
  gamePeriod: number; // number of days between weight events, standard of 7 (1 week)
  minWeightLoss: number;
  weightUnit: string;
  fee: number;
  currency: string;
  vacationLength: number;
}
