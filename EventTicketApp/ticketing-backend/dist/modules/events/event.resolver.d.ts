import { EventsService } from './event.service';
import { Event } from './event.entity';
export declare class EventsResolver {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    events(): Promise<Event[]>;
}
