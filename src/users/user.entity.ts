export class User {
  static collectionName = 'users';

  userId: string;
  email: string;
  password: string;
  name: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
