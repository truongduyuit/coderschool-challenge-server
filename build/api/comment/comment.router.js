"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var validate_1 = require("../../middleware/validate");
var comment_controller_1 = __importDefault(require("./comment.controller"));
var comment_middleware_1 = __importDefault(require("./comment.middleware"));
var createComment_dto_1 = require("./dto/createComment.dto");
var router = (0, express_1.Router)();
router.post("/", validate_1.Auth, (0, validate_1.Valid)(createComment_dto_1.CreateCommentDto, 1 /* RequestType.body */), comment_middleware_1.default.createComment, comment_controller_1.default.createComment);
exports.default = router;
