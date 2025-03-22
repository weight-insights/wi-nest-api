import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';

@Controller('api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/email/:email')
  async findUserByEmail(@Param('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    const userDto: UserDto = {
      userId: user.userId,
      email: user.email,
      name: user.name
    }
    return userDto;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    const userDto: UserDto = {
      userId: user.userId,
      email: user.email,
      name: user.name
    }
    return userDto;
  }

  @Get()
  async findAllUsers() {
    const users = await this.usersService.find();
    const usersDto: UserDto[] = users.map(user => ({
      userId: user.userId,
      email: user.email,
      name: user.name
    }));
    return usersDto;
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UserDto) {
    const user = await this.usersService.update(id, body);
    const userDto: UserDto = {
      userId: user.userId,
      email: user.email,
      name: user.name
    };
    return userDto;
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const user = await this.usersService.remove(id);
    const userDto: UserDto = {
      userId: user.userId,
      email: user.email,
      name: user.name
    };
    return userDto;
  }
}
