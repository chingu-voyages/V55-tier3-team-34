import {Router} from "express";
import {profileController} from "../controllers/profile.controller";

const profileRouter = Router()

profileRouter.get('/:profileId', profileController.getProfile);
profileRouter.get('/', profileController.getProfiles);

export { profileRouter }
