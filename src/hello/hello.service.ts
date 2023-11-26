import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HelloService {
  constructor(private configService: ConfigService) {}

  async find() {
    return { message: this.configService.get<string>('HELLO_WORLD') };
  }
}
