import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { HelloService } from './hello.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [HelloController],
  providers: [HelloService, ConfigService],
})
export class HelloModule {}
