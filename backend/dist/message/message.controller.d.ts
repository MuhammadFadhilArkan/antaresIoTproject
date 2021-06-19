import { PesansService } from './message.service';
import { Pesans } from './message.entity';
import { Pesan } from './message.model';
export declare class PesansController {
    private readonly pesanService;
    constructor(pesanService: PesansService);
    create(pesan: Pesan): Promise<Pesans[]>;
    findAll(): Promise<Pesans[]>;
}
