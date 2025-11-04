import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  token: string;

  @Column()
  userId: number;

  @Column()
  expiryDate: Date;
}
