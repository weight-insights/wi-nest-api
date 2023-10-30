import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

@Module({
  imports: [],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [],
})
export class GamesModule {}
