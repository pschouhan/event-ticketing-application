import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order } from './order.entity';
import { Event } from '../events/event.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    private dataSource: DataSource, // Inject TypeORM DataSource for transactions
  ) {}

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ['event'] });
  }

  async purchaseTicket(eventId: number, quantity: number): Promise<Order> {
    return this.dataSource.transaction(async (manager) => {
      const eventRepository = manager.getRepository(Event);
      const orderRepository = manager.getRepository(Order);
  
      //Lock event row to prevent overselling
      const event = await eventRepository.findOne({ where: { id: eventId }, lock: { mode: 'pessimistic_write' } });
  
      if (!event) throw new Error('Event not found');
      if (event.availableTickets < quantity) throw new Error('Not enough tickets available');
  
      //Reduce ticket count and save
      event.availableTickets -= quantity;
      await eventRepository.save(event);
  
      //  Create order with orderNumber
      const order = orderRepository.create({
        event,
        quantity,
        orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}` //  Assign unique order number
      });
  
      return await orderRepository.save(order);
    });
  }
  
}
