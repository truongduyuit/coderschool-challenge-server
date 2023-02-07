"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongoose = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var configs_1 = require("../configs");
var Mongoose = /** @class */ (function () {
    function Mongoose() {
    }
    Mongoose.init = function (options) {
        mongoose_1.default.set("strictQuery", false);
        mongoose_1.default
            .connect(configs_1.ConfigEnv.MONGO_CONNECTION_STRING, __assign({ user: configs_1.ConfigEnv.DB_USER, pass: configs_1.ConfigEnv.DB_PASS }, options))
            .then(function () {
            console.log("Connect to db: ".concat(configs_1.ConfigEnv.MONGO_CONNECTION_STRING));
        })
            .catch(function (err) {
            console.log("MongoDB connection error. Please make sure MongoDB is running.\n" + err);
            process.exit(1);
        });
        var db = mongoose_1.default.connection;
        db.on("error", function (err) { return console.log("MongoDB error:\n" + err); });
    };
    return Mongoose;
}());
exports.Mongoose = Mongoose;
