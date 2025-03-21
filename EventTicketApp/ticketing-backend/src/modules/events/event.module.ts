import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './event.service';
import { EventsResolver } from './event.resolver';
import { Event } from './event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  providers: [EventsService, EventsResolver],
  exports: [EventsService], 
})
export class EventsModule {}
