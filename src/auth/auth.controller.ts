import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';
import { Public } from './public.decorator';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/users/user.entity';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/sign-up')
  async singUp(@Body() body: CreateUserDto) {
    const user = await this.authService.signUp(body);
    return plainToInstance(User, user);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  singIn(@Body() body: SignInDto) {
    const accessToken = this.authService.signIn(body.email, body.password);
    return accessToken;
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('/sign-out')
  async signOut(@Request() req) {
    return { userId: req.user.sub, email: req.user.username };
  }
}
