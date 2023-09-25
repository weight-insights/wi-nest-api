import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { Auth } from './auth.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  // TODO delete this method after db implementation
  getFakeDb() {
    return [
      {
        id: 1,
        email: 'tfgteles@gmail.com',
        password: 'abc123',
      },
      {
        id: 2,
        email: 'jussaramoreirac@gmail.com',
        password: 'abc123',
      },
    ];
  }

  async signup(email: string, password: string) {
    // See if email is in use
    const users = this.getFakeDb().filter(user => user.email === email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }
    // Generate a salt and hash the salt and the password together
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');
    // Create a new user and save it
    const user: Auth = {id: 3, email, password: result};
    // return the user
    return user;
  }

  async signin(email: string, password: string) {
    const users = this.getFakeDb().filter(user => user.email === email);
    if (!users.length) {
      throw new NotFoundException('user not found');
    }
    const user = users[0];
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    return user;
  }
}
