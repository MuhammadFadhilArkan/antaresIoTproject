import { Repository } from 'typeorm';
import { Pesans } from './message.entity';
import { Pesan } from './message.model';
export declare class PesansService {
    private readonly pesanRepository;
    constructor(pesanRepository: Repository<Pesans>);
    create(pesan: Pesan): Promise<any>;
    findAll(): Promise<Pesans[]>;
}
