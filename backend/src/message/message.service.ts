import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { Pesans } from './message.entity';
import { Pesan } from './message.model';

@Injectable()
export class PesansService {
  constructor(
    @InjectRepository(Pesans)
    private readonly pesanRepository: Repository<Pesans>,
  ) {}

  async create(pesan: Pesan): Promise<any> {
    return await this.pesanRepository.save(pesan);
  }

  async findAll(): Promise<Pesans[]> {
    return this.pesanRepository.find();
  }

}
