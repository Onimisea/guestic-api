import { CreateReservationPriceDto } from './../listings/dto/create-listing.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { EnvService } from 'src/env/env.service';
import axios, { AxiosRequestConfig } from 'axios';
import { ListingsService } from 'src/listings/listings.service';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly envService: EnvService,
    private readonly listingsService: ListingsService,
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    const listingExist = await this.listingsService.findOne(
      createReservationDto.listingMapId,
    );

    if (!listingExist) {
      throw new NotFoundException('Listing or property not found!');
    }

    const listingId = String(createReservationDto.listingMapId);

    const createReservationPriceDto: CreateReservationPriceDto = {
      startingDate: createReservationDto.arrivalDate,
      endingDate: createReservationDto.departureDate,
      numberOfGuests: createReservationDto.numberOfGuests,
      version: 2,
    };

    const calculateReservationPrice =
      await this.listingsService.calculateReservationPrice(
        listingId,
        createReservationPriceDto,
      );

    const totalPrice = calculateReservationPrice.result.totalPrice;
    const financeField = calculateReservationPrice.result.components;

    const url = `https://api.hostaway.com/v1/reservations?validatePaymentMethod=1`;
    const authToken = this.envService.get('HOSTAWAY_ACCESS_TOKEN');

    const headers = {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    };

    const createReservationData = {
      channelId: 2000,
      listingMapId: `${createReservationDto.listingMapId}`,
      source: 'Guestic Webapp',
      guestName: createReservationDto.guestName,
      guestEmail: createReservationDto.guestEmail,
      numberOfGuests: createReservationDto.numberOfGuests,
      arrivalDate: createReservationDto.arrivalDate,
      departureDate: createReservationDto.departureDate,
      phone: createReservationDto.phone,
      totalPrice,
      financeField,
      ccNumber: createReservationDto.ccNumber,
      ccName: createReservationDto.ccName,
      ccExpirationYear: createReservationDto.ccExpirationYear,
      ccExpirationMonth: createReservationDto.ccExpirationMonth,
      cvc: createReservationDto.cvc,
    };

    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(createReservationData),
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Failed to create reservation: ${response.statusText}`);
      }

      const data = await response.json();
      const results = data.result;

      return results;
    } catch (error) {
      // Handle errors
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async getPaymentMethods() {
    const url = `https://api.hostaway.com/v1/reservations/paymentMethods`;
    const authToken = this.envService.get('HOSTAWAY_ACCESS_TOKEN');

    const headers = {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    };

    const options = {
      method: 'GET',
      headers,
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch reservation payment methods: ${response.statusText}`,
        );
      }

      const data = await response.json();
      const results = data.result;

      return results;
    } catch (error) {
      // Handle errors
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    const url = `https://api.hostaway.com/v1/reservations`;
    const authToken = this.envService.get('HOSTAWAY_ACCESS_TOKEN');

    const headers = {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    };

    const options = {
      method: 'GET',
      headers,
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch all reservations: ${response.statusText}`,
        );
      }

      const data = await response.json();
      const results = data.result;

      return results;
    } catch (error) {
      // Handle errors
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async findOne(reservationId) {
    const url = `https://api.hostaway.com/v1/reservations/${reservationId}`;
    const authToken = this.envService.get('HOSTAWAY_ACCESS_TOKEN');

    const headers = {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    };

    const options = {
      method: 'GET',
      headers,
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch the reservation: ${response.statusText}`,
        );
      }

      const data = await response.json();
      const results = data.result;

      return results;
    } catch (error) {
      // Handle errors
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async paymentCards(reservationId) {
    const url = `https://api.hostaway.com/v1/paymentCards/${reservationId}`;
    const authToken = this.envService.get('HOSTAWAY_ACCESS_TOKEN');

    const headers = {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    };

    const options = {
      method: 'GET',
      headers,
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch payment cards for the reservation: ${response.statusText}`,
        );
      }

      const data = await response.json();
      const results = data.result;

      return results;
    } catch (error) {
      // Handle errors
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }
}
