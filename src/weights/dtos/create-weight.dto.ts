import { IsNumber, IsString } from 'class-validator';

export class CreateWeightDto {
  @IsString()
  gameId: string;

  @IsString()
  memberId: string;

  @IsNumber()
  weight: number;
}
