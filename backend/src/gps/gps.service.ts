import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { gpss } from './gps.entity';
import { gps } from './gps.model';

@Injectable()
export class gpssService {
  constructor(
    @InjectRepository(gpss)
    private readonly gpsRepository: Repository<gpss>,
  ) {}

  async create(Gps: gps): Promise<any> {
    return await this.gpsRepository.save(Gps);
  }

  async findAll(): Promise<gpss[]> {
    return this.gpsRepository.find();
  }

}
