import {Router} from "express";
import {profileController} from "../controllers/profile.controller";
import {validationData} from "../middleware/validation.middleware";
import {userUpdateSchema} from "../db/schema/user";
import {ensureAuthenticated} from "../middleware/auth.middleware";

const profileRouter = Router()

profileRouter.get('/:profileId', profileController.getProfile);
profileRouter.get('/', profileController.getProfiles);
profileRouter.put('/', ensureAuthenticated, validationData(userUpdateSchema), profileController.updateProfile)

export { profileRouter }
