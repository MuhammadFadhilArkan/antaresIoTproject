import { Controller, Get, Post,Body} from '@nestjs/common';
import { PesansService } from './message.service';
import { Pesans } from './message.entity';
import { Pesan } from './message.model';

@Controller('message')
export class PesansController {
  constructor(private readonly pesanService: PesansService) {}

  // CREATE
  @Post()
  async create(@Body() pesan: Pesan): Promise<Pesans[]> {
    return this.pesanService.create(pesan);
  }

  // READ All
  @Get()
  findAll(): Promise<Pesans[]> {
    return this.pesanService.findAll();
  }

}
