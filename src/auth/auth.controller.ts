import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { UserDto } from 'src/users/user.dto';
import { User } from 'src/users/user.entity';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/sign-up')
  async singUp(@Body() body: UserDto) {
    const user = await this.authService.signUp(body);
    return user;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  async singIn(@Body() body: Partial<User>) {
    const accessToken = await this.authService.signIn(
      body.email,
      body.password,
    );
    return accessToken;
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('/sign-out')
  signOut(@Request() req) {
    return { userId: req.user.sub, email: req.user.username };
  }
}
