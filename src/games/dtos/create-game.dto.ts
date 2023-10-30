import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateGameDto {
  @IsString()
  name: string;

  @IsString()
  info: string;

  @IsArray()
  dates: string[];

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
