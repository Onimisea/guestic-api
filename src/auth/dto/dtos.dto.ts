import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

// Signup DTO
class SignupDto {
  @ApiProperty({
    description: 'Valid email address',
    example: 'user@example.com', // Example email address
  })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({
    description:
      'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol',
    example: 'P@ssw0rd!', // Example of a valid password
    minLength: 6,
    pattern:
      '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\[\\]{};:\'"\\\\|,.<>?]).+$',
  })
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/[0-9]/, {
    message: 'Password must contain at least one number',
  })
  @Matches(/[!@#$%^&*()_+[\]{};':"\\|,.<>?]/, {
    message: 'Password must contain at least one symbol (e.g., !@#$%^&*)',
  })
  password: string;

  @ApiProperty({
    description:
      'Confirm Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol',
    example: 'P@ssw0rd!', // Example of a valid password
    minLength: 6,
    pattern:
      '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\[\\]{};:\'"\\\\|,.<>?]).+$',
  })
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Confirm Password must be at least 6 characters long',
  })
  @Matches(/[A-Z]/, {
    message: 'Confirm Password must contain at least one uppercase letter',
  })
  @Matches(/[a-z]/, {
    message: 'Confirm Password must contain at least one lowercase letter',
  })
  @Matches(/[0-9]/, {
    message: 'Confirm Password must contain at least one number',
  })
  @Matches(/[!@#$%^&*()_+[\]{};':"\\|,.<>?]/, {
    message: 'Confirm Password must contain at least one symbol (e.g., !@#$%^&*)',
  })
  confirmPassword: string;
}

// Signin DTO
class SigninDto {
  @ApiProperty({
    description: 'Valid email address',
    example: 'user@example.com', // Example email address
  })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @ApiProperty({
    description:
      'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol',
    example: 'P@ssw0rd!', // Example of a valid password
    minLength: 6,
    pattern:
      '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\[\\]{};:\'"\\\\|,.<>?]).+$',
  })
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/[0-9]/, {
    message: 'Password must contain at least one number',
  })
  @Matches(/[!@#$%^&*()_+[\]{};':"\\|,.<>?]/, {
    message: 'Password must contain at least one symbol (e.g., !@#$%^&*)',
  })
  password: string;
}

// Forgotten Password DTO
class ForgottenPasswordDto {
  @ApiProperty({
    description: 'Valid email address',
    example: 'user@example.com', // Example email address
  })
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;
}

// Password Reset DTO
class PasswordResetDto {
  @ApiProperty({
    description:
      'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol',
    example: 'P@ssw0rd!', // Example of a valid password
    minLength: 6,
    pattern:
      '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\[\\]{};:\'"\\\\|,.<>?]).+$',
  })
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/[0-9]/, {
    message: 'Password must contain at least one number',
  })
  @Matches(/[!@#$%^&*()_+[\]{};':"\\|,.<>?]/, {
    message: 'Password must contain at least one symbol (e.g., !@#$%^&*)',
  })
  password: string;

  @ApiProperty({
    description:
      'Confirm Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol',
    example: 'P@ssw0rd!', // Example of a valid password
    minLength: 6,
    pattern:
      '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\[\\]{};:\'"\\\\|,.<>?]).+$',
  })
  @IsNotEmpty()
  @MinLength(6, {
    message: 'Confirm Password must be at least 6 characters long',
  })
  @Matches(/[A-Z]/, {
    message: 'Confirm Password must contain at least one uppercase letter',
  })
  @Matches(/[a-z]/, {
    message: 'Confirm Password must contain at least one lowercase letter',
  })
  @Matches(/[0-9]/, {
    message: 'Confirm Password must contain at least one number',
  })
  @Matches(/[!@#$%^&*()_+[\]{};':"\\|,.<>?]/, {
    message:
      'Confirm Password must contain at least one symbol (e.g., !@#$%^&*)',
  })
  confirmPassword: string;
}

export { SignupDto, SigninDto, ForgottenPasswordDto, PasswordResetDto };
