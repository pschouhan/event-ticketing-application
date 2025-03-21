"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./modules/orders/order.entity");
const event_entity_1 = require("./modules/events/event.entity");
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
        const dataSource = app.get(typeorm_1.DataSource);
        if (!dataSource.isInitialized) {
            yield dataSource.initialize();
        }
        const eventRepo = dataSource.getRepository(event_entity_1.Event);
        const orderRepo = dataSource.getRepository(order_entity_1.Order);
        const events = [
            { name: 'New Year Bash', date: new Date('2024-01-01'), availableTickets: 0 },
            { name: 'Tech Expo', date: new Date('2024-02-10'), availableTickets: 5 },
            { name: 'AI Conference', date: new Date('2025-06-01'), availableTickets: 100 },
            { name: 'Startup Pitch', date: new Date('2025-07-10'), availableTickets: 0 },
            { name: 'Comedy Night', date: new Date('2025-08-15'), availableTickets: 50 },
            { name: 'Food Festival', date: new Date('2025-09-20'), availableTickets: 200 },
            { name: 'Film Awards', date: new Date('2025-10-05'), availableTickets: 10 },
            { name: 'Marathon', date: new Date('2025-03-10'), availableTickets: 0 },
            { name: 'Science Fair', date: new Date('2025-04-18'), availableTickets: 30 },
            { name: 'Football Finals', date: new Date('2025-11-11'), availableTickets: 80 },
            { name: 'Gaming Convention', date: new Date('2025-12-01'), availableTickets: 100 },
            { name: 'Rock Concert', date: new Date('2025-06-20'), availableTickets: 0 },
            { name: 'Tech Summit', date: new Date('2025-08-25'), availableTickets: 40 },
            { name: 'Book Fair', date: new Date('2025-07-05'), availableTickets: 90 },
            { name: 'Music Festival', date: new Date('2025-10-20'), availableTickets: 0 },
        ];
        yield eventRepo.save(events);
        yield orderRepo.save([
            { orderNumber: 'ORD12345', event: events[2], quantity: 2 },
            { orderNumber: 'ORD12346', event: events[4], quantity: 1 },
            { orderNumber: 'ORD12347', event: events[6], quantity: 3 },
        ]);
        console.log(' Database seeded with 15 events.');
        yield app.close();
    });
}
seed().catch((err) => {
    console.error('❌ Seeding failed:', err);
});
//# sourceMappingURL=seed.js.map