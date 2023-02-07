"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
var ioredis_1 = __importDefault(require("ioredis"));
var configs_1 = require("../configs");
var RedisService = /** @class */ (function () {
    function RedisService() {
        this.client = new ioredis_1.default(+configs_1.ConfigEnv.REDIS_PORT, configs_1.ConfigEnv.REDIS_HOST, {
            username: configs_1.ConfigEnv.REDIS_USER,
            password: configs_1.ConfigEnv.REDIS_PASSWORD,
        });
        this.client.on("connect", function () {
            console.log("Connected to redis: ".concat(configs_1.ConfigEnv.REDIS_HOST));
        });
        this.client.on("error", function (error) {
            console.error("Redis client error: ".concat(error));
        });
    }
    RedisService.getInstance = function () {
        if (!RedisService.instance) {
            RedisService.instance = new RedisService();
        }
        return RedisService.instance.client;
    };
    return RedisService;
}());
exports.RedisService = RedisService;
