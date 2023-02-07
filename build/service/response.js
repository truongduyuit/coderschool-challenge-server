"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorBuilder = exports.ResponseBuilder = exports.CustomError = void 0;
var logger_1 = require("../configs/logger/logger");
var constant_1 = require("../constant");
var logResEnv = process.env.LOG_RESPONSE_ENV || constant_1.LOG_ENVIRONMENTS.console;
var logErrorEnv = process.env.LOG_ERROR_ENV || constant_1.LOG_ENVIRONMENTS.file;
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(error) {
        var _this = _super.call(this) || this;
        _this.error = error;
        return _this;
    }
    return CustomError;
}(Error));
exports.CustomError = CustomError;
var ResponseBuilder = /** @class */ (function () {
    function ResponseBuilder() {
    }
    ResponseBuilder.send = function (res, data) {
        logger_1.Logger.getLogger(logResEnv).info(data);
        return res.status(data.status || constant_1.HTTP_CODE.Ok).json(data);
    };
    return ResponseBuilder;
}());
exports.ResponseBuilder = ResponseBuilder;
var ErrorBuilder = /** @class */ (function () {
    function ErrorBuilder() {
    }
    ErrorBuilder.send = function (res, error) {
        logger_1.Logger.getLogger(logErrorEnv).error(error);
        return res.status((error === null || error === void 0 ? void 0 : error.status) || constant_1.HTTP_CODE.InternalServerError).json(error);
    };
    return ErrorBuilder;
}());
exports.ErrorBuilder = ErrorBuilder;
