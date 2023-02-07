"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
var utils_1 = require("../../utils");
var user_model_1 = require("./user.model");
exports.UserService = new utils_1.MongooseBaseService(user_model_1.UserModel);
