import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { HelloService } from './hello.service';
import { Public } from 'src/auth/public.decorator';
import { Hello } from './hello.entity';

@Controller('hello')
export class HelloController {
  constructor(private helloService: HelloService) {}

  @Public()
  @Post()
  async createHello(@Body() body: Partial<Hello>) {
    const hello = await this.helloService.create(body.message);
    return hello;
  }

  @Public()
  @Get('/:id')
  async findHello(@Param('id') id: string) {
    const hello = await this.helloService.findOne(id);
    return hello;
  }

  @Public()
  @Get()
  async findAllHellos() {
    const hellos = await this.helloService.find();
    return hellos;
  }

  @Public()
  @Patch('/:id')
  async updateWeight(@Param('id') id: string, @Body() body: Partial<Hello>) {
    const hello = await this.helloService.update(id, body);
    return hello;
  }

  @Public()
  @Delete('/:id')
  async removeWeight(@Param('id') id: string) {
    const hello = await this.helloService.remove(id);
    return hello;
  }
}
