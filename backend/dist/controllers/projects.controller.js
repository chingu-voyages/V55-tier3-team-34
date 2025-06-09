"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectController = void 0;
const projects_repository_1 = require("../repositories/projects.repository");
const repo = (0, projects_repository_1.projectsRepository)();
exports.projectController = {
    createProject: async (req, res, next) => {
        try {
            const data = req.body;
            const project = await repo.createProject(data);
            res.status(201).json({ data: project });
        }
        catch (e) {
            console.error(e);
            res.status(500).json({
                message: e instanceof Error ? e.message : "Failed to create project",
            });
        }
    },
    getProjectById: async (req, res, next) => {
        const { projectId } = req.params;
        try {
            const project = await repo.getProjectById(parseInt(projectId, 10));
            if (!project) {
                res.status(404).json({ message: "Project not found" });
            }
            else {
                res.status(200).json({ data: project });
            }
        }
        catch (e) {
            console.error(e);
            res.status(500).json({
                message: e instanceof Error ? e.message : "Failed to fetch project",
            });
        }
    },
    listProjects: async (req, res, next) => {
        try {
            const projects = await repo.listProjects();
            res.status(200).json({ data: projects });
        }
        catch (e) {
            console.error(e);
            res.status(500).json({
                message: e instanceof Error ? e.message : "Failed to list projects",
            });
        }
    },
    updateProject: async (req, res, next) => {
        const { projectId } = req.params;
        try {
            const project = await repo.updateProject(parseInt(projectId, 10), req.body);
            res.status(200).json({ data: project });
        }
        catch (e) {
            console.error(e);
            res.status(500).json({
                message: e instanceof Error ? e.message : "Failed to update project",
            });
        }
    },
    searchTeammates: async (req, res, next) => {
        const query = req.query;
        const search = query.search;
        try {
            const teammates = await repo.findUsersByIdentifiers(search);
            res.status(200).json({ data: teammates });
        }
        catch (e) {
            console.error('Search teammates error:', e);
            res.status(500).json({
                message: e instanceof Error ? e.message : "Failed to search teammates",
            });
        }
    }
};
