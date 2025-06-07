import {Router} from "express";
import {tagsController} from "../controllers/tags.controller";

const tagRouter = Router();
tagRouter.get('/', tagsController.getAllTags);

export { tagRouter }
