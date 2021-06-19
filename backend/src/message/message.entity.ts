import { Column, Entity,PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pesans {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp')
  time?: Date;

  @Column('text')
  content?: string;

  @Column('text')
  rn: string;
}
