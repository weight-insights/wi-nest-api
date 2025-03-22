import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { v4 as uuidv4 } from 'uuid';
import { CollectionReference } from '@google-cloud/firestore';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(User.collectionName)
    private usersCollection: CollectionReference<User>,
  ) {}

  async create(user: UserDto): Promise<User> {
    const userId = uuidv4();
    const newUser = {
      userId,
      ...user,
    } as User;
    await this.usersCollection.doc(userId).set(newUser);
    return newUser;
  }

  async find(): Promise<User[]> {
    const snapshot = await this.usersCollection.get();
    const users: User[] = [];
    snapshot.forEach((doc) => users.push(doc.data() as User));
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = (await this.usersCollection.doc(id).get())?.data() as User;
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const snapshot = await this.usersCollection
      .where('email', '==', email)
      .get();
    if (snapshot.empty) {
      throw new Error(`User with email ${email} does not exist.`);
    }
    const users: User[] = [];
    snapshot.forEach((doc) => users.push(doc.data() as User));
    return users[0];
  }

  async update(id: string, attrs: UserDto): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const updatedUser = { ...user, ...attrs, userId: id };
    await this.usersCollection.doc(id).update(updatedUser);
    return (updatedUser as User);
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    await this.usersCollection.doc(id).delete();
    return user;
  }
}
