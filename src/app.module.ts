import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { GamesModule } from './games/games.module';
import { MembersModule } from './members/members.module';
import { WeightsModule } from './weights/weights.module';

@Module({
  imports: [UsersModule, AuthModule, GamesModule, MembersModule, WeightsModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
