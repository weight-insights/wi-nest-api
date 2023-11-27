import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(user: CreateUserDto) {
    // See if email is in use
    const existingUsers = await this.usersService.findByEmail(user.email);
    if (existingUsers.length > 0) {
      throw new BadRequestException('email in use');
    }
    // Generate a salt and hash the salt and the password together
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    // Create a new user and save it
    user.password = hash;
    const newUser = this.usersService.create(user);
    // return the user
    return newUser;
  }

  async signIn(email: string, password: string) {
    const users = await this.usersService.findByEmail(email);
    if (users.length === 0) {
      throw new NotFoundException('user not found');
    }
    const isMatch = await bcrypt.compare(password, users[0].password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: users[0].userId, username: users[0].email };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
