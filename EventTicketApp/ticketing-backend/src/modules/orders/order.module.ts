import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './order.service';
import { OrdersResolver } from './order.resolver';
import { Order } from './order.entity';
import { EventsModule } from '../events/event.module';
import { Event } from '../events/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Event]), EventsModule],
  providers: [OrdersService, OrdersResolver],
})
export class OrdersModule {}
