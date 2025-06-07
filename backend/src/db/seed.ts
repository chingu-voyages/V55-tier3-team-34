import {tagsSeed} from "./seeds/tags.seed";
import {projectsSeed} from "./seeds/projects.seed";

async function seed() {
    try {
        await tagsSeed()
        await projectsSeed();
    }catch (error) {
        console.error('❌ Error during seeding:', error);
        throw error;
    }
}

seed().catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});
