import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  create(email: string, password: string, name: string) {
    console.log(`email: ${email}, name: ${name}, password: ${password}`);
  }

  find() {
    return [
      { id: 1, email: 'tfgteles@gmail.com', password: 'abc123', name: 'Tiago' },
    ];
  }

  findOne(id: number) {
    return {
      id,
      email: 'tfgteles@gmail.com',
      password: 'abc123',
      name: 'Tiago',
    };
  }

  findOneByEmail(email: string) {
    return {
      id: 1,
      email,
      password: 'abc123',
      name: 'Tiago',
    };
  }
}
