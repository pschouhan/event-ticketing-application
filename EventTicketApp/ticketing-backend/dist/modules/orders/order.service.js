"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./order.entity");
const event_entity_1 = require("../events/event.entity");
let OrdersService = class OrdersService {
    constructor(ordersRepository, eventsRepository, dataSource) {
        this.ordersRepository = ordersRepository;
        this.eventsRepository = eventsRepository;
        this.dataSource = dataSource;
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.ordersRepository.find({ relations: ['event'] });
        });
    }
    purchaseTicket(eventId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataSource.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                const eventRepository = manager.getRepository(event_entity_1.Event);
                const orderRepository = manager.getRepository(order_entity_1.Order);
                const event = yield eventRepository.findOne({ where: { id: eventId }, lock: { mode: 'pessimistic_write' } });
                if (!event)
                    throw new Error('Event not found');
                if (event.availableTickets < quantity)
                    throw new Error('Not enough tickets available');
                event.availableTickets -= quantity;
                yield eventRepository.save(event);
                const order = orderRepository.create({
                    event,
                    quantity,
                    orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`
                });
                return yield orderRepository.save(order);
            }));
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _c : Object])
], OrdersService);
//# sourceMappingURL=order.service.js.map