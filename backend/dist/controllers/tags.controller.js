"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagsController = void 0;
const tag_repository_1 = require("../repositories/tag.repository");
const tagRepo = (0, tag_repository_1.tagRepository)();
exports.tagsController = {
    getAllTags: async (req, res, next) => {
        const { search = '', limit = 10 } = req.query;
        try {
            const tags = await tagRepo.getAllTags(search || '');
            res.status(200).json({
                success: true,
                data: tags,
                meta: {}
            });
        }
        catch (e) {
            if (e instanceof Error) {
                res.status(500).json({
                    message: e.message,
                });
            }
            else {
                res.status(500).json({ message: 'Failed to fetch tags' });
            }
        }
    }
};
