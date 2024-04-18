import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist';
import { Observable } from 'rxjs';
// import { UserType } from 'src/common/enums.enum';

// Auth Guard
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: Error) {
    const errorMessage = 'You are not authenticated, please login!';
    if (err || !user) {
      throw err || new UnauthorizedException(errorMessage);
    }
    return user;
  }
}

// Custom Auth Guard
@Injectable()
export class GuesticAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    
    if (!user) {
      throw new UnauthorizedException(
        'You are not authenticated. Please log in!.',
      );
    }

    return true;
  }
}

// // UserType Guard
// @Injectable()
// export class AdminGuard implements CanActivate {
//   canActivate(context: ExecutionContext): boolean {
//     const request = context.switchToHttp().getRequest();
//     const user = request.user;

//     // Check user type
//     if (user.type !== UserType.ADMIN) {
//       throw new ForbiddenException(
//         'You do not have permission to access this resource',
//       );
//     }

//     return true;
//   }
// }
