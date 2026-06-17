import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getTask(): string {
    return 'Hi saba, U have to CONQUER THE WORLD! Right here, right now';
  }
}
