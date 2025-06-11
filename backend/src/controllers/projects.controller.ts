import { NextFunction, Response, Request } from 'express';
import { projectsRepository } from '../repositories/projects.repository';
import { NewProjectInput } from '../utils/types/projects/schemas/projects';

const repo = projectsRepository();

export const projectController = {
  createProject: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: NewProjectInput = req.body;
      const project = await repo.createProject(data);
      res.status(201).json({ data: project });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: e instanceof Error ? e.message : 'Failed to create project',
      });
    }
  },

  getProjectById: async (req: Request, res: Response, next: NextFunction) => {
    const { projectId } = req.params;
    try {
      const project = await repo.getProjectById(parseInt(projectId, 10));
      if (!project) {
        res.status(404).json({ message: 'Project not found' });
      } else {
        res.status(200).json({ data: project });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: e instanceof Error ? e.message : 'Failed to fetch project',
      });
    }
  },

  listProjects: async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, tier } = req.query;
    const projects = await repo.listProjects({
      title: typeof title === 'string' ? title : undefined,
      description: typeof description === 'string' ? description : undefined,
      tier: typeof tier === 'string' ? tier : undefined,
    });

    const transformed = projects.map((project) => ({
      ...project,
      contributors: project.contributors.map((c) => ({
        ...c,
        role: c.role?.name || null,
      })),
    }));
    res.status(200).json({ data: transformed });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: e instanceof Error ? e.message : "Failed to list projects",
    });
  }
},
  updateProject: async (req: Request, res: Response, next: NextFunction) => {
    const { projectId } = req.params;
    try {
      const project = await repo.updateProject(
        parseInt(projectId, 10),
        req.body,
      );
      res.status(200).json({ data: project });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: e instanceof Error ? e.message : 'Failed to update project',
      });
    }
  },
  searchTeammates: async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const search = query.search as string;

    try {
      const teammates = await repo.findUsersByIdentifiers(search);
      res.status(200).json({ data: teammates });
    } catch (e) {
      console.error('Search teammates error:', e);
      res.status(500).json({
        message: e instanceof Error ? e.message : 'Failed to search teammates',
      });
    }
  },
};
