"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gpsModule = void 0;
const common_1 = require("@nestjs/common");
const gps_service_1 = require("./gps.service");
const gps_controller_1 = require("./gps.controller");
const typeorm_1 = require("@nestjs/typeorm");
const gps_entity_1 = require("./gps.entity");
let gpsModule = class gpsModule {
};
gpsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([gps_entity_1.gpss])],
        providers: [gps_service_1.gpssService],
        controllers: [gps_controller_1.gpsController],
    })
], gpsModule);
exports.gpsModule = gpsModule;
//# sourceMappingURL=gps.module.js.map