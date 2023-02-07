"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordUtils = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
/**
 *
 * @param password want to convert to hash
 * @returns hash for the password
 */
var hash = function (password) {
    var salt = bcrypt_1.default.genSaltSync(10);
    return bcrypt_1.default.hashSync(password, salt);
};
/**
 *
 * @param password
 * @param hash
 * @returns boolean
 */
var verify = function (password, hash) {
    return bcrypt_1.default.compareSync(password, hash);
};
exports.PasswordUtils = {
    hash: hash,
    verify: verify,
};
