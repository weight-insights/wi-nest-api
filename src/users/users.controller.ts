import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('api')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/v1/users')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body.email, body.password, body.name);
  }

  @Get('v1/users/email/:email')
  findlUserByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Get('/v1/users/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get('v1/users')
  findAllUsers() {
    return this.usersService.find();
  }

  @Patch('/v1/users/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete('v1/users/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
