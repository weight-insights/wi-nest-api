import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { HelloService } from './hello.service';
import { Public } from 'src/auth/public.decorator';
import { CreateHelloDto } from './dtos/create-hello.dto';
import { UpdateHelloDto } from './dtos/update-hello.dto';
import { plainToInstance } from 'class-transformer';
import { Hello } from './hello.entity';

@Controller('hello')
export class HelloController {
  constructor(private helloService: HelloService) {}

  @Public()
  @Post()
  async createHello(@Body() body: CreateHelloDto) {
    const hello = await this.helloService.create(body);
    return plainToInstance(Hello, hello);
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async findHello(@Param('id') id: string) {
    const hello = await this.helloService.findOne(id);
    return plainToInstance(Hello, hello);
  }

  @Public()
  @Get()
  async findAllHellos() {
    const hellos = await this.helloService.find();
    return plainToInstance(Hello, hellos);
  }

  @Public()
  @Patch('/:id')
  async updateWeight(@Param('id') id: string, @Body() body: UpdateHelloDto) {
    const hello = await this.helloService.update(id, body);
    return plainToInstance(Hello, hello);
  }

  @Public()
  @Delete('/:id')
  async removeWeight(@Param('id') id: string, @Request() req) {
    // console.log('userId', req.user.sub);
    // console.log('email', req.user.username);
    const hello = await this.helloService.remove(id);
    return plainToInstance(Hello, hello);
  }
}
