export class Hello {
  static collectionName = 'hello';

  helloId: string;
  name: string;
  creationDate: string;

  constructor(partial: Partial<Hello>) {
    Object.assign(this, partial);
  }
}
