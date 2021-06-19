import { Module } from '@nestjs/common';
import { gpssService } from './gps.service';
import { gpsController } from './gps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { gpss } from './gps.entity';

@Module({
  imports: [TypeOrmModule.forFeature([gpss])],
  providers: [gpssService],
  controllers: [gpsController],
})
export class gpsModule {}
