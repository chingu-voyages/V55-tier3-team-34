import {projectsRepository} from "../repositories/projects.repository";
import {NewProjectInput} from "../types/projects/schemas/projects";

async function seed() {
    console.log('🌱 Starting seeding...');
    const projectData : NewProjectInput = {
        title: 'Awesome Seed Project',
        shortDescription: 'Created via seeding script',
        longDescription: "This is a full description of the project",
        voyage: 55,
        tier: 3,
        mainImageUrl: "https://image.com",
        githubRepo: 'https://github.com/example/awesome-project',
        teammates: [3, 4,5],
        tags: [1,2]
    }
    // Seed project
    await projectsRepository().createProject(projectData);
    console.log('✅ Seeding complete!');
    console.log('Created project:');
}

seed().catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
});
