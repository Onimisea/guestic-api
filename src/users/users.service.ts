import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { EnvService } from 'src/env/env.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    private envService: EnvService,

    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: [
        'id',
        'email',
        'firstname',
        'lastname',
        'phoneNumber',
        'alternativePhoneNumber',
        'dateOfBirth',
      ],
    });
  }

  async findOne(id: string): Promise<any> {
    // Find the user by ObjectId in the database
    const user = await this.userRepository.findOneBy(id);

    // If user is not found, throw NotFoundException
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      phoneNumber: user.phoneNumber,
      alternativePhoneNumber: user.alternativePhoneNumber,
      dateOfBirth: user.dateOfBirth,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    // Find the user by ID in the database
    const user = await this.userRepository.findOneBy(id);

    // If user is not found, throw NotFoundException
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update the user entity with the provided data
    if (updateUserDto.firstname !== undefined) {
      user.firstname = updateUserDto.firstname;
    }
    if (updateUserDto.lastname !== undefined) {
      user.lastname = updateUserDto.lastname;
    }
    if (updateUserDto.phoneNumber !== undefined) {
      user.phoneNumber = updateUserDto.phoneNumber;
    }
    if (updateUserDto.alternativePhoneNumber !== undefined) {
      user.alternativePhoneNumber = updateUserDto.alternativePhoneNumber;
    }
    if (updateUserDto.dateOfBirth !== undefined) {
      user.dateOfBirth = updateUserDto.dateOfBirth;
    }

    // Save the updated user to the database
    const savedUser = await this.userRepository.save(user);
    return {
      id: savedUser.id,
      email: savedUser.email,
      firstname: savedUser.firstname,
      lastname: savedUser.lastname,
      phoneNumber: savedUser.phoneNumber,
      alternativePhoneNumber: savedUser.alternativePhoneNumber,
      dateOfBirth: savedUser.dateOfBirth,
    };
  }

  async remove(id: string) {
    // Find the user by ID in the database
    const user = await this.userRepository.findOneBy(id);

    // If user is not found, throw NotFoundException
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Remove the user from the database
    await this.userRepository.remove(user);

    return 'User deleted successfully';
  }
}
