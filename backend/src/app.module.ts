import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { gpss } from './gps/gps.entity';
import { gpsModule } from './gps/gps.module';
import { Pesans } from './message/message.entity';
import { PesansModule } from './message/message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'fadhil4323',
      database: 'dashboard',
      entities: [gpss, Pesans],
      synchronize: true,
    }),
    gpsModule, PesansModule,
  ],
})
export class AppModule {}
