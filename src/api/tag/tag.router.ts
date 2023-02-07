import { Router } from "express";
import { RequestType } from "../../constant";
import { Auth, Valid } from "../../middleware/validate";
import { CreateTagDto } from "./dto/createTag.dto";
import { GetTagDto } from "./dto/getTags.dto";
import tagController from "./tag.controller";

const router = Router();

// check only user logged in can create tag
router.post("/", Auth, Valid(CreateTagDto, RequestType.body), tagController.createTag);

router.get("/", Valid(GetTagDto, RequestType.query), tagController.getTags);

export default router;
