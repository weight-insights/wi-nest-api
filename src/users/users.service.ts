import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { CollectionReference } from '@google-cloud/firestore';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(User.collectionName)
    private usersCollection: CollectionReference<User>,
  ) {}

  async create(user: User): Promise<UserDto> {
    const doc = await this.usersCollection.add(user);
    const userDto: UserDto = {
      userId: doc.id,
      email: user.email,
      name: user.name
    } as UserDto;
    return userDto;
  }

  async find(): Promise<UserDto[]> {
    const snapshot = await this.usersCollection.get();
    const users: UserDto[] = [];
    snapshot.forEach((doc) => users.push(this.parseUserEntityToDto(doc)));
    return users;
  }

  async findOne(id: string): Promise<UserDto> {
    const doc = await this.usersCollection.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException('user not found');
    }
    return this.parseUserEntityToDto(doc);
  }

  async findByEmailForSingIn(email: string): Promise<{ id: string; password: string; }> {
    const snapshot = await this.usersCollection
      .where('email', '==', email)
      .get();
    if (snapshot.empty) {
      throw new Error(`User with email ${email} does not exist.`);
    }
    const users: { id: string; password: string; }[] = [];
    snapshot.forEach((doc) => users.push({ id: doc.id, password: doc.data().password }));
    return users[0];
  }

  async findByEmail(email: string): Promise<UserDto> {
    const snapshot = await this.usersCollection
      .where('email', '==', email)
      .get();
    if (snapshot.empty) {
      throw new Error(`User with email ${email} does not exist.`);
    }
    const users: UserDto[] = [];
    snapshot.forEach((doc) => users.push(this.parseUserEntityToDto(doc)));
    return users[0];
  }

  async findIfUserExistsByEmail(email: string): Promise<boolean> {
    const snapshot = await this.usersCollection
      .where('email', '==', email)
      .get();
    
    return !snapshot.empty;
  }

  async update(id: string, attrs: Partial<User>): Promise<UserDto> {
    if (attrs.password) {
      throw new BadRequestException('no password update in this method');
    }
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const updatedUser = {
      userId: user.userId,
      email: attrs.email ?? user.email,
      name: attrs.name ?? user.name,
      defaultGameId: attrs.defaultGameId ?? user.defaultGameId
    } as UserDto;
    await this.usersCollection.doc(id).update(attrs);
    return updatedUser;
  }

  async remove(id: string): Promise<UserDto> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    await this.usersCollection.doc(id).delete();
    return user;
  }

  private parseUserEntityToDto(doc: { id: string; data: () => User; }): UserDto {
    const docData = doc.data();
    const userDto: UserDto = {
      userId: doc.id,
      email: docData.email,
      name: docData.name,
      defaultGameId: docData.defaultGameId
    } as UserDto;
    return userDto;
  }
}
