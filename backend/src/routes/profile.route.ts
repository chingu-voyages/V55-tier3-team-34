import {Router} from "express";
import {profileController} from "../controllers/profile.controller";
import {userUpdateSchema} from "../db/schema/user";
import {ensureAuthenticated} from "../middleware/auth.middleware";
import {validateData} from "../middleware/validation.middleware";
import {ZodSchema} from "zod";

const profileRouter = Router()

profileRouter.get('/:profileId', profileController.getProfile);
profileRouter.get('/', profileController.getProfiles);
profileRouter.get('/me', ensureAuthenticated, profileController.getMyProfile);
profileRouter.put('/', ensureAuthenticated, validateData(userUpdateSchema), profileController.updateProfile)

export { profileRouter }
