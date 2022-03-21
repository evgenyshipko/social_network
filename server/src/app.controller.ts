import {Controller, Get} from '@nestjs/common';

@Controller('/api')
export class AppController {

  @Get()
  getHello(): string {
    return 'server is active';
  }
}
