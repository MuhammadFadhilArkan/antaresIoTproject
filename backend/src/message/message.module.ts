import { Module } from '@nestjs/common';
import { PesansService } from './message.service';
import { PesansController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pesans } from './message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pesans])],
  providers: [PesansService],
  controllers: [PesansController],
})
export class PesansModule {}
