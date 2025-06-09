"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projects_controller_1 = require("../controllers/projects.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const projects_1 = require("../db/schema/projects");
const projects_2 = require("../utils/types/projects/schemas/projects");
const projectRouter = (0, express_1.Router)();
projectRouter.post("/", (0, validation_middleware_1.validateData)(projects_2.createProjectSchema), projects_controller_1.projectController.createProject);
projectRouter.get("/", projects_controller_1.projectController.listProjects);
projectRouter
    .get("/:projectId", projects_controller_1.projectController.getProjectById)
    .put("/:projectId", auth_middleware_1.ensureAuthenticated, (0, validation_middleware_1.validateData)(projects_1.updateProjectSchema), projects_controller_1.projectController.updateProject);
projectRouter
    .get("/search/teammates", projects_controller_1.projectController.searchTeammates);
exports.default = projectRouter;
