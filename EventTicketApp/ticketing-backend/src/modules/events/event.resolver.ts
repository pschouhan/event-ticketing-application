import { Query, Resolver } from '@nestjs/graphql';
import { EventsService } from './event.service';
import { Event } from './event.entity';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @Query(() => [Event])
  events() {
    return this.eventsService.findAll();
  }
}
