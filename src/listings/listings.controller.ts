import { HttpService } from '@nestjs/axios';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto, CreateReservationPriceDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Controller('listings')
@ApiTags('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all listings' })
  @ApiResponse({ status: 200, description: 'Returns all listings.' })
  findAll() {
    return this.listingsService.findAll();
  }

  @Get('listing-fee-settings/:listingId')
  @ApiOperation({ summary: 'Get listing fees by listing ID' })
  @ApiParam({
    name: 'listingId',
    description: 'The ID of the listing whose fees to retrieve.',
  })
  getListingFeeSettings(@Param('listingId') listingId: string) {
    return this.listingsService.getListingFeeSettings(listingId);
  }

  @Post('calculate-reservation-price/:listingId')
  @ApiOperation({ summary: 'Calculate reservation price by listing ID' })
  @ApiParam({
    name: 'listingId',
    description: 'The ID of the listing whose reservation price to calculate.',
  })
  calculateReservationPrice(
    @Param('listingId') listingId: string,
    @Body() createReservationPriceDto: CreateReservationPriceDto,
  ) {
    return this.listingsService.calculateReservationPrice(
      listingId,
      createReservationPriceDto,
    );
  }

  @Get(':listingId')
  @ApiOperation({ summary: 'Get a listing by ID' })
  @ApiParam({
    name: 'listingId',
    description: 'The ID of the listing to retrieve.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the listing with the specified ID.',
  })
  @ApiResponse({ status: 404, description: 'Listing not found.' })
  findOne(@Param('listingId') listingId: string) {
    return this.listingsService.findOne(listingId);
  }
}
