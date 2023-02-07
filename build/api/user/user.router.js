"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var validate_1 = require("../../middleware/validate");
var createUser_dto_1 = require("./dto/createUser.dto");
var login_dto_1 = require("./dto/login.dto");
var refreshtoken_dto_1 = require("./dto/refreshtoken.dto");
var user_controller_1 = __importDefault(require("./user.controller"));
var user_middleware_1 = __importDefault(require("./user.middleware"));
var router = (0, express_1.Router)();
router.post("/signup", (0, validate_1.Valid)(createUser_dto_1.CreateUserDto, 1 /* RequestType.body */), user_middleware_1.default.createUser, user_controller_1.default.createUser);
router.post("/signin", (0, validate_1.Valid)(login_dto_1.LoginDto, 1 /* RequestType.body */), user_middleware_1.default.login, user_controller_1.default.login);
router.post("/refresh", (0, validate_1.Valid)(refreshtoken_dto_1.RefreshTokenDto, 1 /* RequestType.body */), user_middleware_1.default.refreshToken, user_controller_1.default.refreshToken);
exports.default = router;
