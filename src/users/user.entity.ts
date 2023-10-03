import { Exclude } from 'class-transformer';

export class User {
  userId: string;

  email: string;

  @Exclude()
  password: string;

  name: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
