import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/users/user.dto';
import { AccessToken } from './auth.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(user: Partial<User>): Promise<UserDto> {
    if (!user.email || !user.password) {
      throw new BadRequestException('email and password are required');
    }
    // See if email is in use
    const userExists = await this.usersService.findIfUserExistsByEmail(user.email);
    if (userExists) {
      throw new BadRequestException('email in use');
    }
    // Generate a salt and hash the salt and the password together
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    // Create a new user and save it
    user.password = hash;
    const newUser = this.usersService.create(user as User);
    // return the user
    return newUser;
  }

  async signIn(email: string, password: string): Promise<AccessToken> {
    const user = await this.usersService.findByEmailForSingIn(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: email };
    const accessToken = await this.jwtService.signAsync(payload);
    return ({ accessToken } as AccessToken);
  }
}
