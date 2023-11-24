import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGameDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  info: string;

  @IsString()
  @IsOptional()
  startDate: string;

  @IsString()
  @IsOptional()
  gameTimeZone: string;

  @IsNumber()
  @IsOptional()
  gameLength: number;

  @IsNumber()
  @IsOptional()
  gamePeriod: number;

  @IsNumber()
  @IsOptional()
  minWeightLoss: number;

  @IsString()
  @IsOptional()
  weightUnit: string;

  @IsNumber()
  @IsOptional()
  fee: number;

  @IsString()
  @IsOptional()
  currency: string;

  @IsNumber()
  @IsOptional()
  vacationLength: number;
}
