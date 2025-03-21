import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { DatabaseConfig } from './config/database.config';
import { Event } from './modules/events/event.entity';
import { Order } from './modules/orders/order.entity';
import { EventsModule } from './modules/events/event.module';
import { OrdersModule } from './modules/orders/order.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Loads environment variables
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      ...DatabaseConfig,
      entities: [Event, Order], // Explicitly define entities
    }),
    EventsModule,
    OrdersModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
