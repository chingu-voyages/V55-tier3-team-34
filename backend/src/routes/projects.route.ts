import {Router} from "express";
import {projectController} from "../controllers/projects.controller";
import {ensureAuthenticated} from "../middleware/auth.middleware";

import {validateData} from "../middleware/validation.middleware";
import { updateProjectSchema} from "../db/schema/projects";
import {createProjectSchema} from "../utils/types/projects/schemas/projects";


const projectRouter = Router();

projectRouter.post("/", validateData(createProjectSchema),  projectController.createProject)

projectRouter.get("/", projectController.listProjects);

projectRouter
    .get("/:projectId", projectController.getProjectById)
    .put(
        "/:projectId",
        ensureAuthenticated,
        validateData(updateProjectSchema),
        (req, res, next) => {
            Promise.resolve(projectController.updateProject(req, res, next)).catch(next);
        }
    );
projectRouter
    .get("/search/teammates", projectController.searchTeammates)

export default projectRouter;
