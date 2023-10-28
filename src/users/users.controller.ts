import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';

@Controller('api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('email/:email')
  findUserByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user: User = await this.usersService.findOne(id);
    return new User(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAllUsers(@Query('query') query = '') {
    return this.usersService.find(query);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('/:id')
  removeUser(@Param('id') id: string, @Request() req) {
    console.log('userId', req.user.sub);
    console.log('email', req.user.username);
    return this.usersService.remove(id);
  }
}
