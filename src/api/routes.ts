import { Router, Request, Response } from "express";
import { ResponseBuilder } from "../service/response";
import userRouter from "./user/user.router";
import postRouter from "./post/post.router";
import tagRouter from "./tag/tag.router";
import voteRouter from "./vote/vote.router";
import commentRouter from "./comment/comment.router";
import voteComment from "./voteComment/voteComment.router";

const router = Router();

router.get("/", (_: Request, res: Response) => {
  return ResponseBuilder.send(res, { data: "alive" });
});

router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/tag", tagRouter);
router.use("/vote", voteRouter);
router.use("/comment", commentRouter);
router.use("/vote-comment", voteComment);

export default router;
