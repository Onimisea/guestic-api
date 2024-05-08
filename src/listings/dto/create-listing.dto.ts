export class CreateListingDto {}


// create-reservation-price.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateReservationPriceDto {
  @ApiProperty({ description: 'Arrival date', type: Date })
  @IsDateString()
  startingDate: Date;

  @ApiProperty({ description: 'Departure date', type: Date })
  @IsDateString()
  endingDate: Date;

  @ApiProperty({ description: 'Number of guests', type: Number })
  @IsInt()
  numberOfGuests: number;

  @ApiProperty({ description: 'Markup', type: Number, required: false })
  @IsOptional()
  @IsNumber()
  @Min(1.0)
  markup?: number;

  @ApiProperty({ description: 'Reservation Coupon ID', type: Number, required: false })
  @IsOptional()
  @IsInt()
  reservationCouponId?: number;

  @ApiProperty({ description: 'Version', type: Number })
  @IsInt()
  version: number;
}
