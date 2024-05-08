import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({
    description: 'The ID of the listing map.',
    example: 40160,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  listingMapId: number;

  @ApiProperty({
    description: 'The name of the guest.',
    example: 'Andrew Peterson',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  guestName: string;

  @ApiProperty({
    description: 'The email of the guest.',
    example: 'mail@test.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  guestEmail: string;

  @ApiProperty({
    description: 'The number of guests.',
    example: 1,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  numberOfGuests: number;

  @ApiProperty({
    description: 'The arrival date.',
    example: '2019-05-19',
    required: true,
  })
  @IsNotEmpty()
  arrivalDate: Date;

  @ApiProperty({
    description: 'The departure date.',
    example: '2019-05-20',
    required: true,
  })
  @IsNotEmpty()
  departureDate: Date;

  @ApiProperty({
    description: 'The phone number of the guest.',
    example: '+75125551212',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'The credit card number of the guest.',
    example: '4242424242424242',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  ccNumber: string;

  @ApiProperty({
    description: 'The name on the credit card.',
    example: 'Andrew Peterson',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  ccName: string;

  @ApiProperty({
    description: 'The expiration year of the credit card.',
    example: '2025',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  ccExpirationYear: string;

  @ApiProperty({
    description: 'The expiration month of the credit card.',
    example: '12',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  ccExpirationMonth: string;

  @ApiProperty({
    description: 'The CVC code of the credit card.',
    example: '423',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  cvc: string;
}
