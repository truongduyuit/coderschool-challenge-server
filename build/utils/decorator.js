"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectModel = exports.useMock = exports.Injectable = void 0;
function Injectable(target) {
    target.injectedServices = target.injectedServices || [];
}
exports.Injectable = Injectable;
function useMock(useMock) {
    return function (target) {
        target.prototype.useMock = useMock;
    };
}
exports.useMock = useMock;
function injectModel(key, model) {
    return function (target) {
        target.prototype.userService = model;
    };
}
exports.injectModel = injectModel;
