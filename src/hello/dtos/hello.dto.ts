import { Exclude, Expose } from 'class-transformer';

export class HelloDto {
  @Expose()
  helloId: string;

  @Expose()
  name: string;

  @Expose()
  creationDate: string;

  @Exclude()
  active: boolean;
}
