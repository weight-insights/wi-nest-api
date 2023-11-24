import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateWeightDto {
  @IsString()
  @IsOptional()
  gameId: string;

  @IsString()
  @IsOptional()
  memberId: string;

  @IsNumber()
  @IsOptional()
  weight: number;

  @IsString()
  @IsOptional()
  date: string;
}
