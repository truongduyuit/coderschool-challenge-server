"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigEnv = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.ConfigEnv = {
    JWT_SECRET: (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "",
    ACCESS_TOKEN_EXPIRE: process.env.ACCESS_TOKEN_EXPIRE || "3d",
    REFRESH_TOKEN_EXPIRE: process.env.ACCESS_TOKEN_EXPIRE || "7d",
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    MONGO_CONNECTION_STRING: (_b = process.env.MONGO_CONNECTION_STRING) !== null && _b !== void 0 ? _b : "",
    REDIS_CONNECTION_STRING: (_c = process.env.REDIS_CONNECTION_STRING) !== null && _c !== void 0 ? _c : "",
    REDIS_HOST: (_d = process.env.REDIS_HOST) !== null && _d !== void 0 ? _d : "",
    REDIS_PORT: (_e = process.env.REDIS_PORT) !== null && _e !== void 0 ? _e : 6379,
    REDIS_USER: (_f = process.env.REDIS_USER) !== null && _f !== void 0 ? _f : "REDIS_USER",
    REDIS_PASSWORD: (_g = process.env.REDIS_PASSWORD) !== null && _g !== void 0 ? _g : "",
};
