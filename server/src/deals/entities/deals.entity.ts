import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Deals {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  img: string;

  @Column()
  price: number;

  @Column()
  tiket: number;

  @Column()
  yield: number;

  @Column()
  sold: number;

  @Column()
  daysLeft: number;
}
