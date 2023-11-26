import { IsString } from 'class-validator';

export class CreateHelloDto {
  @IsString()
  name: string;
}
