import { EnvService } from './../env/env.service';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private envService: EnvService,
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  // Signup method to create a new user
  async signup(signupData): Promise<User> {
    // Check if a user with the given email already exists
    const existingUser = await this.userRepository.findOneBy({
      email: signupData.email,
    });

    if (existingUser) {
      throw new ConflictException('Email already in use. Please login.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(signupData.password, 10);

    console.log(hashedPassword);

    // Create a new user instance
    const newUser = await this.userRepository.create({
      email: signupData.email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await this.userRepository.save(newUser);

    // Return a signup response (you may customize the response as needed)
    return savedUser;
  }

  // Sign-in method to authenticate a user
  async signin(signinData, res: Response) {
    // Find the user by email
    const user = await this.userRepository.findOneBy({
      email: signinData.email,
    });

    if (!user) {
      throw new NotFoundException('Invalid email, user not found');
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(
      signinData.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Prepare the user data for token generation
    const userData = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phoneNumber,
      alternativePhone: user.alternativePhoneNumber,
    };

    // Get the JWT secret from the environment
    const jwtSecret = this.envService.get('JWT_SECRET');

    // Generate a JWT token
    const token = this.jwt.sign(userData, { secret: jwtSecret });

    // Set the token as a cookie in the response headers
    res.cookie('authToken', token, {
      httpOnly: true, // Prevents JavaScript from accessing the cookie
      secure: true, // Use `true` in production when using HTTPS
      sameSite: 'strict', // Prevents cross-site request forgery attacks
      maxAge: 3600000, // Set the cookie expiry time (e.g., 1 hour in milliseconds)
    });

    return res.send('Signed in successfully!');
  }
}
