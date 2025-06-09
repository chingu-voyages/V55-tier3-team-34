import {NextFunction, Request, Response} from "express";
import {tagRepository} from "../repositories/tag.repository";


const tagRepo = tagRepository();

export const tagsController = {
    getAllTags: async (req: Request, res: Response, next: NextFunction) => {
        const { search = '', limit = 10 } = req.query;
        try {
            const tags = await tagRepo.getAllTags(search  as string|| '');
            res.status(200).json({
                success: true,
                data: tags,
                meta: {}
            });
        }catch (e) {
            if (e instanceof Error) {
                res.status(500).json({
                    message: e.message,
                });
            } else {
                res.status(500).json({ message: 'Failed to fetch tags' });
            }
        }
    }
}
