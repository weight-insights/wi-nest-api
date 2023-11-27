import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';
import { plainToInstance } from 'class-transformer';

@Controller('api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/email/:email')
  async findUserByEmail(@Param('email') email: string) {
    const users = await this.usersService.findByEmail(email);
    return plainToInstance(User, users);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return plainToInstance(User, user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAllUsers() {
    const users = await this.usersService.find();
    return plainToInstance(User, users);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.usersService.update(id, body);
    return plainToInstance(User, user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('/:id')
  async removeUser(@Param('id') id: string, @Request() req) {
    console.log('userId', req.user.sub);
    console.log('email', req.user.username);
    const user = await this.usersService.remove(id);
    return plainToInstance(User, user);
  }
}
