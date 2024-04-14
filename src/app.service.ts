import { Injectable } from '@nestjs/common';
import { EnvService } from './env/env.service';

@Injectable()
export class AppService {
  constructor(private envService: EnvService) {}

  getHello(): object {
    const base_url = this.envService.get('BASE_URL');

    return {
      message: 'Welcome to Guestic API Backend!',
      documentation: `${base_url}/api/docs`,
    };
  }
}
