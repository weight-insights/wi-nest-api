import {
  BadRequestException,
  Injectable,
  NotFoundException, UnauthorizedException
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { UserDto } from 'src/users/dtos/user.dto';
import { User } from 'src/users/user.entity';
import { promisify } from 'util';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string) {
    // See if email is in use
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('email in use');
    }
    // Generate a salt and hash the salt and the password together
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');
    // Create a new user and save it
    const newUser: UserDto = { id: 3, email, name: '', password: result };
    // return the user
    return newUser;
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
    // const user: UserDto = users[0];
    // const [salt, storedHash] = user.password.split('.');
    // const hash = (await scrypt(password, salt, 32)) as Buffer;
    // if (storedHash !== hash.toString('hex')) {
    //   throw new BadRequestException('bad password');
    // }
    // return user;
  }
}
