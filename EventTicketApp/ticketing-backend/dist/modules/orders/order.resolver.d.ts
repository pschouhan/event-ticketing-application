import { OrdersService } from './order.service';
import { Order } from './order.entity';
export declare class OrdersResolver {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getOrders(): Promise<Order[]>;
    purchaseTicket(eventId: number, quantity: number): Promise<Order>;
}
