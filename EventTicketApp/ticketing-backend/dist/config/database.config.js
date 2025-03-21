"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfig = void 0;
const order_entity_1 = require("../modules/orders/order.entity");
const event_entity_1 = require("../modules/events/event.entity");
exports.DatabaseConfig = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5434,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '8788',
    database: process.env.DB_NAME || 'ticketing_db',
    entities: [event_entity_1.Event, order_entity_1.Order],
    synchronize: true,
    autoLoadEntities: true,
};
//# sourceMappingURL=database.config.js.map