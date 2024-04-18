import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ZodPipe } from 'src/pipes/zod-validation.pipe';
import { signinSchema, signupSchema } from './auth-schema';
import { SigninDto, SignupDto } from './dto/dtos.dto';
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
}
