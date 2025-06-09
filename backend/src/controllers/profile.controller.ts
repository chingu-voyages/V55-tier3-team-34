import { NextFunction, Request, Response } from 'express';
import { profileRepository } from '../repositories/profile.repository';
import { User } from '../db/schema/user';

export const profileController = {
  getProfile: async (req: Request, res: Response, next: NextFunction) => {
    const { profileId } = req.params;
    try {
      const foundProfile = await profileRepository().getProfileById(
        parseInt(profileId,10),
      );

      if(Array.isArray(foundProfile) && foundProfile.length == 0) {
         res.status(404).json({
           error: "Profile not found"
         })
      }else {
        res.status(200).json({
          data: foundProfile[0],
        });
      }
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).json({
          message: e.message,
        });
      } else {
        res.status(500).json({ message: 'Failed to fetch profile' });
      }
    }
  },
  getProfiles: async (req: Request, res: Response, next: NextFunction) => {
    const page = +(req.query.page || 1);
    const limit = +(req.query.limit || 20);
    const offset = (page - 1) * limit;
    try {
      const foundProfiles = await profileRepository().getAllProfiles(
        limit,
        offset,
      );
      res.status(200).json({
        data: foundProfiles,
      });
    } catch (e: unknown) {
      if (e instanceof Error) {
        res.status(500).json({
          message: e.message,
        });
      } else {
        res.status(500).json({ message: 'Failed to fetch profiles' });
      }
    }
  },

  getMyProfile: async (req: Request, res: Response) => {
    const user = req.user as User;
    try {
      const foundProfile = await profileRepository().getProfileById(
        user.userId,
      );
      if (!foundProfile) {
        res.status(404).json({ error: 'Profile not found' });
      } else {
  
        res.status(200).json({
          data: foundProfile
        });
      }
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).json({ message: e.message });
      } else {
        res.status(500).json({ message: 'Failed to fetch profile' });
      }
    }
  },

  updateProfile: async (req: Request, res: Response, next: NextFunction) => {
    const updateData = req.body;
    const user = req.user as User;
    const userId = user.userId;
    try {
      const updatedProfile = await profileRepository().updateUserProfile(
        userId,
        updateData,
      );
      res.status(201).json({
        data: updatedProfile,
        message: 'Profile udpated sucessfully',
      });
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).json({
          message: e.message,
        });
      } else {
        res.status(500).json({ message: 'Failed to update profile' });
      }
    }
  },
  getUserProjects: async (req: Request, res: Response, next: NextFunction) => {
    const {userId } = req.params as { userId: string }
    try {
      const projects = await  profileRepository().getUserProjectsWithRoles(Number(userId))
      res.status(200).json({
        data: projects,
        message: "User projects retrieved successfully",
      });
    } catch (e) {
      if (e instanceof Error) {
        res.status(500).json({ message: e.message });
      } else {
        res.status(500).json({ message: "Failed to retrieve user projects" });
      }
    }
  },
};
