import { Repository } from 'typeorm';
import { gpss } from './gps.entity';
import { gps } from './gps.model';
export declare class gpssService {
    private readonly gpsRepository;
    constructor(gpsRepository: Repository<gpss>);
    create(Gps: gps): Promise<any>;
    findAll(): Promise<gpss[]>;
}
