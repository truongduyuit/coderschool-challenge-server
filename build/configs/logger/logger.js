"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var constant_1 = require("../../constant");
var log4js_1 = __importDefault(require("log4js"));
var log4js_2 = __importDefault(require("./log4js"));
log4js_1.default.configure(log4js_2.default);
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.getLogger = function (logEnv) {
        if (logEnv === void 0) { logEnv = constant_1.LOG_ENVIRONMENTS.console; }
        return log4js_1.default.getLogger(logEnv);
    };
    return Logger;
}());
exports.Logger = Logger;
