import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePaymentDto {
  @IsString()
  @IsOptional()
  gameId: string;

  @IsString()
  @IsOptional()
  memberId: string;

  @IsNumber()
  @IsOptional()
  payment: number;

  @IsString()
  @IsOptional()
  date: string;
}
