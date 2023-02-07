"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var response_1 = require("../service/response");
var user_router_1 = __importDefault(require("./user/user.router"));
var post_router_1 = __importDefault(require("./post/post.router"));
var tag_router_1 = __importDefault(require("./tag/tag.router"));
var vote_router_1 = __importDefault(require("./vote/vote.router"));
var comment_router_1 = __importDefault(require("./comment/comment.router"));
var router = (0, express_1.Router)();
router.get("/", function (_, res) {
    return response_1.ResponseBuilder.send(res, { data: "alive" });
});
router.use("/user", user_router_1.default);
router.use("/post", post_router_1.default);
router.use("/tag", tag_router_1.default);
router.use("/vote", vote_router_1.default);
router.use("/comment", comment_router_1.default);
exports.default = router;
