"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tags_seed_1 = require("./seeds/tags.seed");
const projects_seed_1 = require("./seeds/projects.seed");
async function seed() {
    try {
        await (0, tags_seed_1.tagsSeed)();
        await (0, projects_seed_1.projectsSeed)();
    }
    catch (error) {
        console.error('❌ Error during seeding:', error);
        throw error;
    }
}
seed().catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});
