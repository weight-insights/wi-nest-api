import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';
import { CollectionReference } from '@google-cloud/firestore';
import { CreateUserDto } from './dtos/create-user.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @Inject(User.collectionName)
    private usersCollection: CollectionReference<User>,
  ) {}

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
    const snapshot = await this.usersCollection.get();
    const users: User[] = [];
    snapshot.forEach((doc) => users.push(doc.data()));
    return users;
  }

  async findOne(id: string) {
    const user = (await this.usersCollection.doc(id).get())?.data();
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async findByEmail(email: string) {
    const snapshot = await this.usersCollection
      .where('email', '==', email)
      .get();
    // if (snapshot.empty) {
    //   throw new Error(`User with email ${email} does not exist.`);
    // }
    const users: User[] = [];
    snapshot.forEach((doc) => users.push(doc.data()));
    return users;
  }

  async update(id: string, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const updatedUser = instanceToPlain(Object.assign(user, attrs));
    await this.usersCollection.doc(id).update(updatedUser);
    return updatedUser;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    await this.usersCollection.doc(id).delete();
    return user;
  }
}
