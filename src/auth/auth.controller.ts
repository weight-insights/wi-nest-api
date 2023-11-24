import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';
import { Public } from './public.decorator';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/sign-up')
  async singUp(@Body() body: SignInDto) {
    const user = await this.authService.signUp(body.email, body.password);
    return user;
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
  async signOut() {
    return { status: 'in progress' };
  }
}
