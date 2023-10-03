import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  // TODO delete this method after db implementation
  private readonly users = [
    {
      userId: '1234a',
      email: 'tfgteles@gmail.com',
      name: 'Tiago',
      password: 'abc123',
    },
    {
      userId: '1234b',
      email: 'jussaramoreirac@gmail.com',
      name: 'Jussara Teles',
      password: 'abc123',
    },
  ];

  // async create(email: string, password: string, name: string) {
  //   return {
  //     id: 3,
  //     email,
  //     name,
  //     password,
  //   };
  // }

  async find(query: string): Promise<User[]> {
    const users = this.users.filter((user) => user.name.includes(query));
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
    const user = this.findOne(id);
    // TODO verify how the db server respond to a not found
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return user;
  }

  async remove(id: string): Promise<User | undefined> {
    const user = this.findOne(id);
    // TODO verify how the db server respond to a not found
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
}
