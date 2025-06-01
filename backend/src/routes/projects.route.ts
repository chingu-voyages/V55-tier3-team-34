import {Router} from "express";
import {projectController} from "../controllers/projects.controller";
import {ensureAuthenticated} from "../middleware/auth.middleware";

import {fullProjectSubmitSchema} from "../types/projects/schemas/projects";
import {validateData} from "../middleware/validation.middleware";
import {updateProjectSchema} from "../db/schema/projects";


const projectRouter = Router();

projectRouter
    .post("/",ensureAuthenticated, validateData(fullProjectSubmitSchema),  projectController.createProject)
    .get("/", projectController.listProjects);

projectRouter
    .get("/:projectId", projectController.getProjectById)
    .put("/:projectId",ensureAuthenticated, validateData(updateProjectSchema), projectController.updateProject);

export default projectRouter;
