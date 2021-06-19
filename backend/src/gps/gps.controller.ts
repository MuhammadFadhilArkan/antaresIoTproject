import { Controller, Get,Post,Body} from '@nestjs/common';
import { gpssService } from './gps.service';
import { gpss } from './gps.entity';
import { gps } from './gps.model';


@Controller('gps')
export class gpsController {
  constructor(private readonly gpsService: gpssService) {}

  // CREATE
  @Post()
  async create(@Body() Gps: gps): Promise<gpss[]> {
    return this.gpsService.create(Gps);
  }

  // READ All
  @Get()
  findAll(): Promise<gpss[]> {
    return this.gpsService.findAll();
  }

}
