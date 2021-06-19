import { Column, Entity,PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class gpss {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp')
  time?: Date;

  @Column('real')
  latitude?:number;

  @Column('real')
  longitude?:number;

  @Column('text')
  rn: string;
}
