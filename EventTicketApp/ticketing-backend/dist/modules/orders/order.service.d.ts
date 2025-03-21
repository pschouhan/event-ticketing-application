import { Repository, DataSource } from 'typeorm';
import { Order } from './order.entity';
import { Event } from '../events/event.entity';
export declare class OrdersService {
    private ordersRepository;
    private eventsRepository;
    private dataSource;
    constructor(ordersRepository: Repository<Order>, eventsRepository: Repository<Event>, dataSource: DataSource);
    findAll(): Promise<Order[]>;
    purchaseTicket(eventId: number, quantity: number): Promise<Order>;
}
