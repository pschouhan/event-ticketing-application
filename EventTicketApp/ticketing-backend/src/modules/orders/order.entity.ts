import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { Event } from '../events/event.entity';
import { v4 as uuidv4 } from 'uuid'; 

@ObjectType()
@Entity()
export class Order {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  orderNumber!: string;

  @Field(() => Event)
  @ManyToOne(() => Event)
  event!: Event;

  @Field()
  @Column()
  quantity!: number;

  @BeforeInsert()
  generateOrderNumber() {
    this.orderNumber = `ORD-${uuidv4().slice(0, 8)}`; 
  }
}
