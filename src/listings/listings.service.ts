import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateListingDto, CreateReservationPriceDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { EnvService } from 'src/env/env.service';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class ListingsService {
  constructor(private readonly envService: EnvService) {}

  async findAll() {
    const listings = this.fetchAllListings();
    return listings;
  }

  async findOne(listingId) {
    const listing = this.fetchOneListing(listingId);
    return listing;
  }

  async getListingFeeSettings(listingId) {
    const url = `https://api.hostaway.com/v1/listingFeeSettings/${listingId}?includeResources=1`;
    const authToken = this.envService.get('HOSTAWAY_ACCESS_TOKEN');

    // Define the request headers
    const headers = {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    };

    try {
      // Make the GET request using fetch and wait for the response
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new BadRequestException(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response JSON
      const responseData = await response.json();

      // Log the response data
      console.log(responseData);

      return responseData;
    } catch (error) {
      // Handle errors
      throw new BadRequestException(error.message);
    }
  }

  async calculateReservationPrice(
    listingId: string,
    createReservationPriceDto: CreateReservationPriceDto,
  ) {
    const url = `https://api.hostaway.com/v1/listings/${listingId}/calendar/priceDetails?includeResources=1`;
    const authToken = this.envService.get('HOSTAWAY_ACCESS_TOKEN');

    // Define the request headers
    const headers = {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    };

    try {
      // Make the POST request using fetch and wait for the response
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(createReservationPriceDto),
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new BadRequestException(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response JSON
      const responseData = await response.json();

      // Log the response data
      // console.log(responseData);

      return responseData;
    } catch (error) {
      // Handle errors
      throw new BadRequestException(error.message);
    }
  }

  private async fetchAllListings() {
    const url = 'https://api.hostaway.com/v1/listings?includeResources=1';
    const authToken = this.envService.get('HOSTAWAY_ACCESS_TOKEN');

    // Define the request configuration including the authorization header
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      // Make the GET request using Axios and wait for the response
      const response = await axios.get(url, config);
      const res = response.data;
      const results = response.data.result;

      // console.log(results)

      const rawListings = {
        status: res.status,
        data: [],
        count: res.count,
        limit: res.limit,
        offset: res.offset,
      };

      for (let result of results) {
        const listing = {
          id: result.id,
          name: result.name,
          description: result.description,
          thumbnailUrl: result.thumbnailUrl,
          price: result.price,
          country: result.country,
          city: result.city,
          street: result.street,
          address: result.address,
          squareMeters: result.squareMeters,
          lat: result.lat,
          lng: result.lng,
          personCapacity: result.personCapacity,
          guestsIncluded: result.guestsIncluded,
          checkInTimeStart: result.checkInTimeStart,
          checkInTimeEnd: result.checkInTimeEnd,
          checkOutTime: result.checkOutTime,
          roomType: result.roomType,
          bathroomType: result.bathroomType,
          bathroomsNumber: result.bathroomsNumber,
          bedroomsNumber: result.bedroomsNumber,
          bedsNumber: result.bedsNumber,
          minNights: result.minNights,
          maxNights: result.maxNights,
          cleaningFee: result.cleaningFee,
          averageReviewRating: result.averageReviewRating,
          listingImages: result.listingImages,
          listingAmenities: result.listingAmenities,
        };

        rawListings.data.push(listing);
      }

      return rawListings;
    } catch (error) {
      // Handle errors
      throw new BadRequestException(error);
    }
  }

  private async fetchOneListing(listingId) {
    const url = `https://api.hostaway.com/v1/listings/${listingId}?includeResources=1`;
    const authToken = this.envService.get('HOSTAWAY_ACCESS_TOKEN');

    // Define the request configuration including the authorization header
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      // Make the GET request using Axios and wait for the response
      const response = await axios.get(url, config);
      const res = response.data;
      const result = response.data.result;

      const rawListing = {
        status: res.status,
        data: [],
        count: res.count,
        limit: res.limit,
        offset: res.offset,
      };

      const listing = {
        id: result.id,
        name: result.name,
        description: result.description,
        thumbnailUrl: result.thumbnailUrl,
        price: result.price,
        country: result.country,
        city: result.city,
        street: result.street,
        address: result.address,
        squareMeters: result.squareMeters,
        lat: result.lat,
        lng: result.lng,
        personCapacity: result.personCapacity,
        guestsIncluded: result.guestsIncluded,
        checkInTimeStart: result.checkInTimeStart,
        checkInTimeEnd: result.checkInTimeEnd,
        checkOutTime: result.checkOutTime,
        roomType: result.roomType,
        bathroomType: result.bathroomType,
        bathroomsNumber: result.bathroomsNumber,
        bedroomsNumber: result.bedroomsNumber,
        bedsNumber: result.bedsNumber,
        minNights: result.minNights,
        maxNights: result.maxNights,
        cleaningFee: result.cleaningFee,
        averageReviewRating: result.averageReviewRating,
        listingImages: result.listingImages,
        listingAmenities: result.listingAmenities,
      };

      return listing;
    } catch (error) {
      // Handle errors
      throw new BadRequestException(error);
    }
  }
}
