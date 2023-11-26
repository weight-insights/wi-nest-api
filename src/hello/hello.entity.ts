import { Exclude } from 'class-transformer';

export class Hello {
  static collectionName = 'hello';

  helloId: string;
  name: string;
  creationDate: string;

  @Exclude()
  active: boolean;

  constructor(partial: Partial<Hello>) {
    Object.assign(this, partial);
  }
}
