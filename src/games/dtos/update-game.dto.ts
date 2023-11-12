import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGameDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  info: string;

  @IsArray()
  @IsOptional()
  dates: string[];

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
