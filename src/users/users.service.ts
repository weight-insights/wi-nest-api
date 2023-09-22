import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  create(email: string, password: string, name: string) {
    console.log(`email: ${email}, name: ${name}, password: ${password}`);
    return {
      id: 1,
      email: 'tfgteles@gmail.com',
      name: 'Tiago',
    };
  }

  find() {
    return [
      {
        id: 1,
        email: 'tfgteles@gmail.com',
        name: 'Tiago',
      },
      {
        id: 2,
        email: 'jussaramoreirac@gmail.com',
        name: 'Jussara Teles',
      },
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
      name: 'Tiago',
    };
  }
}
