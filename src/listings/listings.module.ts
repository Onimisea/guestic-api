import { Module } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import { HttpModule } from '@nestjs/axios';
import { EnvModule } from 'src/env/env.module';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 50000,
        maxRedirects: 5,
      }),
    }),
    EnvModule,
  ],
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class ListingsModule {}
