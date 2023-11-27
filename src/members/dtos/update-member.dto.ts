import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMemberDto {
  @IsNumber()
  @IsOptional()
  weightGoal: number;

  @IsString()
  @IsOptional()
  vacationStartDate: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}
