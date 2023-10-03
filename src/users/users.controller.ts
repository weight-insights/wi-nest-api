import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';

@Controller('api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('email/:email')
  findUserByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user: User = await this.usersService.findOne(id);
    return new User(user);
    // return new User({
    //   id: parseInt(id),
    //   name: 'Devil',
    //   password: '666',
    //   email: 'devil@fire.gov',
    // });
  }

  @Get()
  findAllUsers(@Param('name') name: string) {
    return this.usersService.find(name);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
