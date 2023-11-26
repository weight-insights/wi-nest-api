import { Controller, Get } from '@nestjs/common';
import { HelloService } from './hello.service';
import { Public } from 'src/auth/public.decorator';

@Controller('hello')
export class HelloController {
  constructor(private helloService: HelloService) {}

  @Public()
  @Get()
  findHello() {
    return this.helloService.find();
  }
}
