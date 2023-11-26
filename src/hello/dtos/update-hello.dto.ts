import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateHelloDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  creationDate: string;

  @IsBoolean()
  @IsOptional()
  active: boolean;
}
