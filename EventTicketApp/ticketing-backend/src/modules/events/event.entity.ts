import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Event {
  @Field()
  @PrimaryGeneratedColumn() 
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column({ type: 'timestamp' })
  date!: Date;

  @Field()
  @Column()
  availableTickets!: number;
}
