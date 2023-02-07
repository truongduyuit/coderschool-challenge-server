"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG_LEVEL = exports.LOG_ENVIRONMENTS = void 0;
var LOG_ENVIRONMENTS;
(function (LOG_ENVIRONMENTS) {
    LOG_ENVIRONMENTS["console"] = "default";
    LOG_ENVIRONMENTS["file"] = "file";
})(LOG_ENVIRONMENTS = exports.LOG_ENVIRONMENTS || (exports.LOG_ENVIRONMENTS = {}));
var LOG_LEVEL;
(function (LOG_LEVEL) {
    LOG_LEVEL["off"] = "OFF";
    LOG_LEVEL["fatal"] = "FATAL";
    LOG_LEVEL["error"] = "ERROR";
    LOG_LEVEL["warn"] = "WARN";
    LOG_LEVEL["info"] = "INFO";
    LOG_LEVEL["debug"] = "DEBUG";
    LOG_LEVEL["trace"] = "TRACE";
    LOG_LEVEL["all"] = "ALL";
})(LOG_LEVEL = exports.LOG_LEVEL || (exports.LOG_LEVEL = {}));
