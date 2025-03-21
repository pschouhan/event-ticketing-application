import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { OrdersService } from './order.service';
import { Order } from './order.entity';
import { Int } from '@nestjs/graphql';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}

  // Fetch all orders
  @Query(() => [Order])
  async getOrders() {
    return await this.ordersService.findAll(); // Ensure service method exists
  }

  // Purchase ticket mutation
  @Mutation(() => Order)
  async purchaseTicket(
    @Args('eventId', { type: () => Int }) eventId: number, 
    @Args('quantity', { type: () => Int }) quantity: number
  ) {
    if (quantity <= 0) {
      throw new Error('Quantity must be at least 1');
    }
    
    return await this.ordersService.purchaseTicket(eventId, quantity);
  }
}
