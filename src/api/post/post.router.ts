import { Router } from "express";
import { RequestType } from "../../constant";
import { Auth, Valid } from "../../middleware/validate";
import { CreatePostDto } from "./dto/createPost.dto";
import { IdDto } from "./dto/getPost.dto";
import postController from "./post.controller";

const router = Router();

router.post("/", Auth(), Valid(CreatePostDto, RequestType.body), postController.createPost);

router.get("/:id", Valid(IdDto, RequestType.params), postController.getPostById);

router.delete("/:id", Auth(), Valid(IdDto, RequestType.params), postController.deletePost);

export default router;
