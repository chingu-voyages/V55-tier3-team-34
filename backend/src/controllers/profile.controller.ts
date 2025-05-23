import {NextFunction, Request, Response} from "express";
import {profileRepository} from "../repositories/profile.repository";



export const profileController = {
    getProfile: async (req: Request, res: Response, next: NextFunction)=> {
        const { profileId } = req.params;
        try {
            const foundProfile = await profileRepository().getProfileById(parseInt(profileId))
            res.status(200).json({
                data: foundProfile
            })
        }catch (e) {
            if(e instanceof  Error) {
                res.status(500).json({
                    message: e.message
                })
            }
            res.status(500).json({ message: 'Failed to fetch profile' });
        }
    },
    getProfiles: async (req: Request, res: Response, next: NextFunction) => {
        const page = +(req.query.page || 1);
        const limit = +(req.query.limit || 20);
        const offset = (page - 1) * limit;
        try {
            const foundProfiles = await profileRepository().getAllProfiles(limit, offset)
            res.status(200).json({
                data: foundProfiles,
            })
        }catch (e: unknown) {
            if(e instanceof  Error) {
                res.status(500).json({
                    message: e.message
                })
            }
            res.status(500).json({ message: 'Failed to fetch profiles' });

        }
    }
}
