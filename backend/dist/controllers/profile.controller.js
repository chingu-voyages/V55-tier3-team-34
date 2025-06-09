"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileController = void 0;
const profile_repository_1 = require("../repositories/profile.repository");
exports.profileController = {
    getProfile: async (req, res, next) => {
        const { profileId } = req.params;
        try {
            const foundProfile = await (0, profile_repository_1.profileRepository)().getProfileById(parseInt(profileId, 10));
            if (Array.isArray(foundProfile) && foundProfile.length == 0) {
                res.status(404).json({
                    error: "Profile not found"
                });
            }
            else {
                res.status(200).json({
                    data: foundProfile[0],
                });
            }
        }
        catch (e) {
            if (e instanceof Error) {
                res.status(500).json({
                    message: e.message,
                });
            }
            else {
                res.status(500).json({ message: 'Failed to fetch profile' });
            }
        }
    },
    getProfiles: async (req, res, next) => {
        const page = +(req.query.page || 1);
        const limit = +(req.query.limit || 20);
        const offset = (page - 1) * limit;
        try {
            const foundProfiles = await (0, profile_repository_1.profileRepository)().getAllProfiles(limit, offset);
            res.status(200).json({
                data: foundProfiles,
            });
        }
        catch (e) {
            if (e instanceof Error) {
                res.status(500).json({
                    message: e.message,
                });
            }
            else {
                res.status(500).json({ message: 'Failed to fetch profiles' });
            }
        }
    },
    getMyProfile: async (req, res) => {
        const user = req.user;
        try {
            const foundProfile = await (0, profile_repository_1.profileRepository)().getProfileById(user.userId);
            if (!foundProfile) {
                res.status(404).json({ error: 'Profile not found' });
            }
            else {
                res.status(200).json({
                    data: foundProfile
                });
            }
        }
        catch (e) {
            if (e instanceof Error) {
                res.status(500).json({ message: e.message });
            }
            else {
                res.status(500).json({ message: 'Failed to fetch profile' });
            }
        }
    },
    updateProfile: async (req, res, next) => {
        const updateData = req.body;
        const user = req.user;
        const userId = user.userId;
        try {
            const updatedProfile = await (0, profile_repository_1.profileRepository)().updateUserProfile(userId, updateData);
            res.status(201).json({
                data: updatedProfile,
                message: 'Profile udpated sucessfully',
            });
        }
        catch (e) {
            if (e instanceof Error) {
                res.status(500).json({
                    message: e.message,
                });
            }
            else {
                res.status(500).json({ message: 'Failed to update profile' });
            }
        }
    },
    getUserProjects: async (req, res, next) => {
        const { userId } = req.params;
        try {
            const projects = await (0, profile_repository_1.profileRepository)().getUserProjectsWithRoles(Number(userId));
            res.status(200).json({
                data: projects,
                message: "User projects retrieved successfully",
            });
        }
        catch (e) {
            if (e instanceof Error) {
                res.status(500).json({ message: e.message });
            }
            else {
                res.status(500).json({ message: "Failed to retrieve user projects" });
            }
        }
    },
};
