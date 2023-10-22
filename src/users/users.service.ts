import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  // TODO delete after db implementation
  private readonly users: User[] = [
    {
      userId: '1234a',
      email: 'tfgteles@gmail.com',
      name: 'Tiago',
      password: '$2b$10$F6m4h0zusFaKSz241JDZd.vM6uehUPDa02lhtnFdmI9XTUocITYf2',
    },
    {
      userId: '1234b',
      email: 'jussaramoreirac@gmail.com',
      name: 'Jussara Teles',
      password: '$2b$10$F6m4h0zusFaKSz241JDZd.vM6uehUPDa02lhtnFdmI9XTUocITYf2',
    },
  ];

  async find(query: string): Promise<User[]> {
    const users = this.users.filter(
      (user) => user.name.includes(query) || user.email.includes(query),
    );
    return users;
  }

  async findOne(id: string): Promise<User | undefined> {
    const user: User = this.users.find((user) => user.userId === id);
    // TODO verify how the db server respond to a not found
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((user) => user.email === email);
    // TODO verify how the db server respond to a not found
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async update(id: string, attrs: Partial<User>): Promise<User | undefined> {
    const user = await this.findOne(id);
    // TODO verify how the db server respond to a not found
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return user;
  }

  async remove(id: string): Promise<User | undefined> {
    const user = await this.findOne(id);
    // TODO verify how the db server respond to a not found
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
}
