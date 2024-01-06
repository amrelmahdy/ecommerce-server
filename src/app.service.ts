import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to Shaheen Al Arab For Acgriculture APP';
  }
}
