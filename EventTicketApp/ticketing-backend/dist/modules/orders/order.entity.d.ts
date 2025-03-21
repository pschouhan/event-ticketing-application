import { Event } from '../events/event.entity';
export declare class Order {
    id: number;
    orderNumber: string;
    event: Event;
    quantity: number;
    generateOrderNumber(): void;
}
