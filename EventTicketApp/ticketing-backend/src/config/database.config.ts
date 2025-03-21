import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Order } from '../modules/orders/order.entity';
import { Event } from '../modules/events/event.entity';

export const DatabaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5434,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || '8788',
  database: process.env.DB_NAME || 'ticketing_db',
  entities: [Event, Order], 
  synchronize: true,
  autoLoadEntities: true,
};
