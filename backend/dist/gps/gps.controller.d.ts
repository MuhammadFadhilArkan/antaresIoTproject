import { gpssService } from './gps.service';
import { gpss } from './gps.entity';
import { gps } from './gps.model';
export declare class gpsController {
    private readonly gpsService;
    constructor(gpsService: gpssService);
    create(Gps: gps): Promise<gpss[]>;
    findAll(): Promise<gpss[]>;
}
