import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private readonly users = [
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
