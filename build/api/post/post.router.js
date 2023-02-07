"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var validate_1 = require("../../middleware/validate");
var createPost_dto_1 = require("./dto/createPost.dto");
var getPost_dto_1 = require("./dto/getPost.dto");
var post_controller_1 = __importDefault(require("./post.controller"));
var router = (0, express_1.Router)();
router.post("/", validate_1.Auth, (0, validate_1.Valid)(createPost_dto_1.CreatePostDto, 1 /* RequestType.body */), post_controller_1.default.createPost);
router.get("/:id", (0, validate_1.Valid)(getPost_dto_1.IdDto, 2 /* RequestType.params */), post_controller_1.default.getPostById);
router.delete("/:id", validate_1.Auth, (0, validate_1.Valid)(getPost_dto_1.IdDto, 2 /* RequestType.params */), post_controller_1.default.deletePost);
exports.default = router;
