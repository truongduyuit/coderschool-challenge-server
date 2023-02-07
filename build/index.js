"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var routes_1 = __importDefault(require("./api/routes"));
var logger_1 = require("./configs/logger/logger");
var middleware_1 = require("./middleware");
var service_1 = require("./service");
var redis_1 = require("./service/redis");
dotenv_1.default.config();
var app = (0, express_1.default)();
var host = process.env.HOST;
var port = process.env.PORT;
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(middleware_1.injectRequestId);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, middleware_1.useMorgan)(morgan_1.default));
// init service when start server
service_1.Mongoose.init();
redis_1.RedisService.getInstance();
app.use("/api", routes_1.default);
app.use(function (err, _, res, __) {
    logger_1.Logger.getLogger().error(err);
    return service_1.ErrorBuilder.send(res, err.error);
});
app.listen(port, function () {
    console.log("[\u26A1\uFE0F]: Server is running at ".concat(host, ":").concat(port));
});
