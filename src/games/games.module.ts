import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { MembersModule } from 'src/members/members.module';

@Module({
  imports: [MembersModule],  
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
