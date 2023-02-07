"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("../../constant");
var currentDate = new Date();
exports.default = {
    appenders: {
        console: {
            type: "console",
        },
        file: {
            type: "dateFile",
            filename: "log/error.log",
            maxLogSize: 10485760,
            backups: 3,
            compress: true,
        },
    },
    categories: {
        default: {
            appenders: ["console"],
            level: process.env.CONSOLE_LOG_LEVEL || constant_1.LOG_LEVEL.all,
        },
        file: {
            appenders: ["file"],
            level: process.env.FILE_LOG_LEVEL || constant_1.LOG_LEVEL.trace,
        },
    },
};
