import { IsNumber, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  gameId: string;

  @IsString()
  memberId: string;

  @IsNumber()
  payment: number;
}
