import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ZodPipe } from 'src/pipes/zod-validation.pipe';
import { signinSchema, signupSchema } from './auth-schema';
import {
  ForgottenPasswordDto,
  PasswordResetDto,
  SigninDto,
  SignupDto,
} from './dto/dtos.dto';
import { User } from 'src/users/entities/user.entity';
import { Request, Response } from 'express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Signup a new user' })
  @ApiResponse({ status: 201, description: 'User successfully signed up' })
  async signup(
    @Body(new ZodPipe(signupSchema)) signupData: SignupDto,
  ): Promise<User> {
    return this.authService.signup(signupData);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiResponse({ status: 200, description: 'User successfully signed in' })
  async signin(
    @Body(new ZodPipe(signinSchema)) signinData: SigninDto,
    @Res() res: Response,
  ) {
    return this.authService.signin(signinData, res);
  }

  @Post('forgotten-password')
  @ApiOperation({ summary: 'Handle forgotten password request' })
  @ApiResponse({
    status: 200,
    description: 'Password reset link sent if email is found',
  })
  async forgottenPassword(
    @Body() forgottenPasswordDto: ForgottenPasswordDto,
  ): Promise<{ message: string; resetLink: string }> {
    return await this.authService.handleForgottenPassword(forgottenPasswordDto);
  }

  @Post('password-reset')
  @ApiOperation({ summary: 'Reset user password' })
  @ApiResponse({ status: 200, description: 'Password has been reset' })
  @ApiQuery({
    name: 'token',
    required: true,
    description: 'The reset token to validate the password reset request',
  })
  async passwordReset(
    @Query('token') token: string,
    @Body() passwordResetDto: PasswordResetDto,
  ): Promise<string> {
    return await this.authService.passwordReset(token, passwordResetDto);
  }
}
