import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { GamesModule } from './games/games.module';
import { MembersModule } from './members/members.module';
import { WeightsModule } from './weights/weights.module';
import { PaymentsModule } from './payments/payments.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirestoreModule } from './firestore/firestore.module';
import { HelloModule } from './hello/hello.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    GamesModule,
    MembersModule,
    WeightsModule,
    PaymentsModule,
    HelloModule,
    ConfigModule.forRoot({ isGlobal: true }),
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        // keyFilename: configService.get<string>('KEY_FILE_NAME'),
        projectId: configService.get<string>('FIRESTORE_PROJECT_ID'),
        credentials: {
          client_email: configService.get<string>('FIRESTORE_CLIENT_EMAIL'),
          private_key: configService.get<string>('FIRESTORE_PRIVATE_KEY'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
