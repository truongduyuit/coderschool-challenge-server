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
exports.JWTUtils = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var configs_1 = require("../configs");
/**
 *
 * @param data payload
 * @param options jwt.SignOptions
 * @returns JWT token
 */
var generateAccessToken = function (data, options) {
    if (options === void 0) { options = {}; }
    return jsonwebtoken_1.default.sign(__assign(__assign({}, data), { isAccess: true }), configs_1.ConfigEnv.JWT_SECRET, __assign({ expiresIn: configs_1.ConfigEnv.ACCESS_TOKEN_EXPIRE }, options));
};
/**
 *
 * @param data payload
 * @param options jwt.SignOptions
 * @returns JWT token
 */
var generateRefreshToken = function (data, options) {
    if (options === void 0) { options = {}; }
    return jsonwebtoken_1.default.sign(__assign(__assign({}, data), { isRefresh: true }), configs_1.ConfigEnv.JWT_SECRET, __assign({ expiresIn: configs_1.ConfigEnv.REFRESH_TOKEN_EXPIRE }, options));
};
/**
 *
 * @param token JWT
 * @returns string | jwt.JwtPayload
 */
var verifyToken = function (token) {
    return jsonwebtoken_1.default.verify(token, configs_1.ConfigEnv.JWT_SECRET);
};
exports.JWTUtils = { generateAccessToken: generateAccessToken, generateRefreshToken: generateRefreshToken, verifyToken: verifyToken };
