"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagsSeed = void 0;
const tag_repository_1 = require("../../repositories/tag.repository");
const tags_1 = require("../data/tags");
const tagsSeed = async () => {
    console.log('📝 Creating tags...');
    await (0, tag_repository_1.tagRepository)().createTags(tags_1.techTags);
    console.log(`✅ Created ${tags_1.techTags.length} tags successfully!`);
};
exports.tagsSeed = tagsSeed;
