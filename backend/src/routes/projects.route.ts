import {Router} from "express";
import {projectController} from "../controllers/projects.controller";
import {ensureAuthenticated} from "../middleware/auth.middleware";

import {validateData} from "../middleware/validation.middleware";
import {createProjectSchema , updateProjectSchema} from "../db/schema/projects";


const projectRouter = Router();

projectRouter.post("/", validateData(createProjectSchema),  projectController.createProject)
projectRouter.get("/", projectController.listProjects);

projectRouter
    .get("/:projectId", projectController.getProjectById)
    .put("/:projectId",ensureAuthenticated, validateData(updateProjectSchema), projectController.updateProject);

export default projectRouter;
