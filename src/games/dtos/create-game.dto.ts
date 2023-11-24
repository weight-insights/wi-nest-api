import { IsNumber, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  name: string;

  @IsString()
  info: string;

  @IsString()
  startDate: string;

  @IsString()
  gameTimeZone: string;

  @IsNumber()
  gameLength: number;

  @IsNumber()
  gamePeriod: number;

  @IsNumber()
  minWeightLoss: number;

  @IsString()
  weightUnit: string;

  @IsNumber()
  fee: number;

  @IsString()
  currency: string;

  @IsNumber()
  vacationLength: number;
}
