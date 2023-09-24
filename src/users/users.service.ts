import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  // TODO delete this method after db implementation
  getFakeDb() {
    return [
      {
        id: 1,
        email: 'tfgteles@gmail.com',
        name: 'Tiago',
        password: 'abc123',
      },
      {
        id: 2,
        email: 'jussaramoreirac@gmail.com',
        name: 'Jussara Teles',
        password: 'abc123',
      },
    ];
  }

  async create(email: string, password: string, name: string) {
    // TODO ensure unique user
    return {
      id: 3,
      email,
      name,
      password,
    };
  }

  async find() {
    return this.getFakeDb();
  }

  async findOne(id: number) {
    const user = this.getFakeDb().find((user) => user.id === id);
    // TODO verify how the db server respond to a not found
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const user = this.getFakeDb().find((user) => user.email === email);
    // TODO verify how the db server respond to a not found
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async update(id: number, attrs: Partial<User>) {
    const user = this.getFakeDb().find((user) => user.id === id);
    // TODO verify how the db server respond to a not found
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return user;
  }

  async remove(id: number) {
    const user = this.getFakeDb().find((user) => user.id === id);
    // TODO verify how the db server respond to a not found
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
}
