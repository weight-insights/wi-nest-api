import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Session, UseGuards
} from "@nestjs/common";
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';
import { AuthGuard } from "./auth.guard";

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  async singUp(@Body() body: SignInDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    session.email = user.email;
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  singIn(@Body() body: SignInDto) {
    const accessToken = this.authService.signIn(body.email, body.password);
    return accessToken;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('/sign-out')
  async signOut() {
    return { status: 'in progress'};
  }
}
