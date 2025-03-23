export class User {
  static collectionName = 'users';

  email: string;
  password: string;
  name: string;
  defaultGameId?: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
