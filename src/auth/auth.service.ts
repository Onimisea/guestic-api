import { EnvService } from './../env/env.service';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
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
import { ForgottenPasswordDto, PasswordResetDto } from './dto/dtos.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private envService: EnvService,
    private jwtService: JwtService,
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

  async handleForgottenPassword(
    dto: ForgottenPasswordDto,
  ): Promise<{ message: string; resetLink: string }> {
    // Find the user by email
    const user = await this.userRepository.findOneBy({ email: dto.email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Generate password reset token and link
    const payload = {
      email: user.email,
      firstname: user.firstname,
    };
    // Define options for the token, including expiration time and secret key
    const options = {
      expiresIn: '5m', // Token will expire in 5 minutes
      secret: this.envService.get('JWT_SECRET'),
    };

    // Use JwtService to generate the token asynchronously
    const resetToken = await this.jwtService.signAsync(payload, options);
    const base_url = this.envService.get('BASE_URL_CLIENT');
    const resetLink = `${base_url}/auth/reset-password?token=${resetToken}`;

    return {
      message:
        'Password Reset link have been sent to your email. Check your email to proceed',
      resetLink: resetLink,
    };

    // Send password reset link via email
    // await this.mailService.sendPasswordResetEmail(user.email, resetLink);
  }

  async passwordReset(
    token: string,
    passwordResetDto: PasswordResetDto,
  ): Promise<string> {
    try {
      // Verify the token and decode the payload
      const options = {
        secret: this.envService.get('JWT_SECRET'),
      };
      const payload = await this.jwtService.verifyAsync(token, options);

      // Extract the user ID from the payload
      const userEmail = payload.email;

      // Find the user in the database
      const user = await this.userRepository.findOneBy({ email: userEmail });

      // Check if user exists
      if (!user) {
        throw new BadRequestException('Invalid token or user not found');
      }

      // Ensure the new password matches the confirmation password
      if (passwordResetDto.password !== passwordResetDto.confirmPassword) {
        throw new BadRequestException('Passwords do not match');
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(passwordResetDto.password, 10);

      // Update the user's password in the database
      user.password = hashedPassword;
      const savedUser = await this.userRepository.save(user);
      if (savedUser) {
        return 'Password reset successful. Login with your new password';
      }
    } catch (error) {
      // Handle JWT verification errors and any other errors
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Reset token has expired');
      }

      if (
        error.name === 'JsonWebTokenError' ||
        error.name === 'NotBeforeError'
      ) {
        throw new BadRequestException('Invalid token');
      }
    }
  }
}
