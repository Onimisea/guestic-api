import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from './env/env.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env/env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { EnvService } from './env/env.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ListingsModule } from './listings/listings.module';
import { ReservationsModule } from './reservations/reservations.module';
import { CorsMiddleware } from './common/cors-middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),

    EnvModule,
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    CacheModule.register(),
    TypeOrmModule.forRootAsync({
      imports: [EnvModule],
      useFactory: async (envService: EnvService) => ({
        type: 'mongodb',
        url: envService.get('MONGODB_CONNECTION_STRING'),
        database: envService.get('MONGODB_DATABASE'),
        synchronize: false,
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      }),
      inject: [EnvService],
    }),
    AuthModule,
    UsersModule,
    ListingsModule,
    ReservationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
