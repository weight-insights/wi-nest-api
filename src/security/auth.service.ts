import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(email: string, password: string) {
    // See if email is in use
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('email in use');
    }
    // Generate a salt and hash the salt and the password together
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    // Create a new user and save it
    const newUser: User = new User({
      userId: 'asdf456',
      email,
      name: '',
      password: hash,
    });
    // return the user
    return newUser;
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
