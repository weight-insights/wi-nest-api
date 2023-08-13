import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/v1')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password, body.name);
  }

  findAllUsers() {
    this.usersService.find();
  }
}
