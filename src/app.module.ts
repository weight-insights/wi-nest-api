import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './security/auth.module';
import { AuthGuard } from './security/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { GamesModule } from './games/games.module';

@Module({
  imports: [UsersModule, AuthModule, GamesModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
