import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/email/:email')
  async findUserByEmail(@Param('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    return user;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return user;
  }

  @Get()
  async findAllUsers() {
    const users = await this.usersService.find();
    return users;
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: Partial<User>) {
    const user = await this.usersService.update(id, body);
    return user;
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const user = await this.usersService.remove(id);
    return user;
  }
}
