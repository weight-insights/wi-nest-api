export class Hello {
  static collectionName = 'hello';

  helloId: string;
  message: string;
  creationDate: string;

  constructor(partial: Partial<Hello>) {
    Object.assign(this, partial);
  }
}
