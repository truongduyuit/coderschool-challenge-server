"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectRequestId = void 0;
var uuid_1 = require("uuid");
var injectRequestId = function (req, res, next) {
    req.headers["reqId"] = (0, uuid_1.v1)();
    next();
};
exports.injectRequestId = injectRequestId;
