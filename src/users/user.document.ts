export class UserDocument {
  static collectionName = 'user';

  id: string;
  email: string;
  password: string;
  name: string;
}
