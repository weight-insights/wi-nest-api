import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  gameId: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  weightGoal: number;
}
