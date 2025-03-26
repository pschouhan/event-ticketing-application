import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Order } from '../modules/orders/order.entity';
import { Event } from '../modules/events/event.entity';
config();

export const DatabaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: String(process.env.DB_PASS),
  database: process.env.DB_NAME,
  entities: [Event, Order], 
  synchronize: true,
  autoLoadEntities: true,
};
