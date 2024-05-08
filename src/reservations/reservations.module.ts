import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { EnvModule } from 'src/env/env.module';
import { HttpModule } from '@nestjs/axios';
import { ListingsModule } from 'src/listings/listings.module';
import { ListingsService } from 'src/listings/listings.service';

@Module({
  imports: [ListingsModule, EnvModule],
  controllers: [ReservationsController],
  providers: [ReservationsService, ListingsService],
})
export class ReservationsModule {}
