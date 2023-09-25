import { Body, Controller, Post, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/v1/auth/signup')
  async singup(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    session.email = user.email;
    return user;
  }

  @Post('/v1/auth/signin')
  async singin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    session.email = user.email;
    return user;
  }

  @Post('/v1/auth/signout')
  async signout(@Session() session: any) {
    session.userId = null;
    session.email = null;
  }
}
