import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('api')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/v1/users')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body.email, body.password, body.name);
  }

  @Get('/v1/users/:id')
  findUser(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Get('v1/users')
  findAllUsers() {
    return this.usersService.find();
  }
}
