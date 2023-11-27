import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';
import { CollectionReference } from '@google-cloud/firestore';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(User.collectionName) private usersCollection: CollectionReference<User>) {}

  private readonly users = [];

  async create(user: CreateUserDto) {
    const userId = uuidv4();
    const newUser = {
      userId,
      ...user,
    };
    await this.usersCollection.doc(userId).set(newUser);
    return newUser;
  }
  
  async find() {
    return this.users;
  }

  async findOne(id: string) {
    const user = this.users.find((user) => user.userId === id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async findByEmail(email: string) {
    const users = this.users.filter((user) => user.email === email);
    return users;
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return user;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
}
