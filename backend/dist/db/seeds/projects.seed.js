"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectsSeed = void 0;
const projects_repository_1 = require("../../repositories/projects.repository");
const projectsSeed = async () => {
    console.log('🌱 Starting seeding project...');
    const projectData = {
        title: 'Awesome Seed Project',
        shortDescription: 'Created via seeding script',
        longDescription: "This is a full description of the project",
        voyage: 55,
        tier: 3,
        mainImageUrl: "https://image.com",
        githubRepo: 'https://github.com/example/awesome-project',
        teammates: [3, 4, 5],
        tags: [1, 2]
    };
    await (0, projects_repository_1.projectsRepository)().createProject(projectData);
    console.log('✅ Seeding project complete!');
};
exports.projectsSeed = projectsSeed;
