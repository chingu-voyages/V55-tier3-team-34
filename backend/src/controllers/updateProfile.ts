import { Request, Response } from "express";
import { profileRepository } from "../repositories/profile.repository";

export const profileController = {
  updateProfile: async (req: Request, res: Response) => {
    try {
      const userId = (req.user as { userId: number })?.userId;
      if (!userId) return res.status(401).json({ error: "Unauthorized" });

      const { firstname, lastname, bio, avatarUrl, githubUrl } = req.body;

      // Update user
      await profileRepository().updateUserProfile(userId, {
        firstname,
        lastname,
        bio,
        avatarUrl,
        githubUrl,
      });

      return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error("Profile update error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getProfile: async (req: Request, res: Response) => {
    const id = parseInt(req.params.profileId, 10);
    const profile = await profileRepository().getProfileById(id);
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    return res.status(200).json(profile);
  },

  getProfiles: async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    const profiles = await profileRepository().getAllProfiles(limit, offset);
    return res.status(200).json(profiles);
  },
};
