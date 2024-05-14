import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('reservations')
@ApiTags('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a reservation' })
  @ApiResponse({
    status: 201,
    description: 'The reservation has been successfully created.',
  })
  create(@Body() createReservationDto: CreateReservationDto) {
    // console.log(createReservationDto)
    return this.reservationsService.create(createReservationDto);
  }

  @Get('payment-methods')
  @ApiOperation({ summary: 'Get available payment methods' })
  @ApiResponse({
    status: 200,
    description: 'Returns the list of available payment methods.',
  })
  getPaymentMethods() {
    return this.reservationsService.getPaymentMethods();
  }

  @Get()
  @ApiOperation({ summary: 'Get all reservations' })
  @ApiResponse({ status: 200, description: 'Returns all reservations.' })
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get('payment-cards/:reservationId')
  @ApiOperation({ summary: 'Get all payment cards for the reservation' })
  @ApiResponse({
    status: 200,
    description: 'Returns all payment cards for the reservation.',
  })
  @ApiParam({
    name: 'reservationId',
    description:
      'The ID of the reservation whose payment cards are to be fetched.',
  })
  paymentCards(@Param('reservationId') reservationId: string) {
    return this.reservationsService.paymentCards(reservationId);
  }

  @Get(':reservationId')
  @ApiOperation({ summary: 'Get one reservation' })
  @ApiResponse({ status: 200, description: 'Returns one reservation.' })
  @ApiParam({
    name: 'reservationId',
    description: 'The ID of the reservation to be fetched.',
  })
  findOne(@Param('reservationId') reservationId: string) {
    return this.reservationsService.findOne(reservationId);
  }
}
