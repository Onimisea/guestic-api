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
    description: 'The firstname of the guest.',
    example: 'Andrew',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'The lastname of the guest.',
    example: 'Andrew',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'The email of the guest.',
    example: 'mail@test.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

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
  phoneNumber: string;

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

  // Additional fields from the submitted data
  @ApiProperty({
    description: 'The birthdate of the guest.',
    example: '19-May-2022',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  birthdate: string;

  @ApiProperty({
    description: 'The confirm email of the guest.',
    example: 'hylydeg@mailinator.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  confirmEmail: string;

  @ApiProperty({
    description: 'The alternative phone number of the guest.',
    example: '8034023726',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  alternativePhoneNumber: string;

  // Additional fields from the submitted data
  @ApiProperty({
    description: 'The password for the account.',
    example: 'Pa$$w0rd!',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'The confirmation password for the account.',
    example: 'Pa$$w0rd!',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;

  @ApiProperty({
    description: 'The first name for payment.',
    example: 'Octavius',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  paymentFirstName: string;

  @ApiProperty({
    description: 'The last name for payment.',
    example: 'Valentine',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  paymentLastName: string;

  @ApiProperty({
    description: 'The country of the guest.',
    example: 'Aut in voluptas ut m',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  country: string;
}
