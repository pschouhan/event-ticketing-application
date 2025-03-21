import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { Order } from './modules/orders/order.entity';
import { Event } from './modules/events/event.entity';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  const eventRepo = dataSource.getRepository(Event);
  const orderRepo = dataSource.getRepository(Order);

  // 📌 Events List
  const events = [
    { name: 'New Year Bash', date: new Date('2024-01-01'), availableTickets: 0 }, 
    { name: 'Tech Expo', date: new Date('2024-02-10'), availableTickets: 5 },     
    { name: 'AI Conference', date: new Date('2025-06-01'), availableTickets: 100 }, 
    { name: 'Startup Pitch', date: new Date('2025-07-10'), availableTickets: 0 },  // Sold out
    { name: 'Comedy Night', date: new Date('2025-08-15'), availableTickets: 50 },
    { name: 'Food Festival', date: new Date('2025-09-20'), availableTickets: 200 },
    { name: 'Film Awards', date: new Date('2025-10-05'), availableTickets: 10 },
    { name: 'Marathon', date: new Date('2025-03-10'), availableTickets: 0 },      
    { name: 'Science Fair', date: new Date('2025-04-18'), availableTickets: 30 },
    { name: 'Football Finals', date: new Date('2025-11-11'), availableTickets: 80 },
    { name: 'Gaming Convention', date: new Date('2025-12-01'), availableTickets: 100 },
    { name: 'Rock Concert', date: new Date('2025-06-20'), availableTickets: 0 },   // Sold out
    { name: 'Tech Summit', date: new Date('2025-08-25'), availableTickets: 40 },
    { name: 'Book Fair', date: new Date('2025-07-05'), availableTickets: 90 },
    { name: 'Music Festival', date: new Date('2025-10-20'), availableTickets: 0 }, // Sold out
  ];

  await eventRepo.save(events);

  // Insert orders for reference
  await orderRepo.save([
    { orderNumber: 'ORD12345', event: events[2], quantity: 2 },
    { orderNumber: 'ORD12346', event: events[4], quantity: 1 },
    { orderNumber: 'ORD12347', event: events[6], quantity: 3 },
  ]);

  console.log(' Database seeded with 15 events.');
  await app.close();
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
});
