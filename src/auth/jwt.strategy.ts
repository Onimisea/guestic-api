import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
// import { AdminRole, UserType } from 'src/common/enums.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && 'authToken' in req.cookies) {
      return req.cookies.authToken;
    }
    return null;
  }

  // async validate(payload: {
  //   id: string;
  //   firstName: string;
  //   lastName: string;
  //   phoneNumber: string;
  //   email: string;
  //   userType: UserType;
  //   farmName?: string;
  //   adminRole?: AdminRole;
  // }) {
  //   return payload;
  // }
}
