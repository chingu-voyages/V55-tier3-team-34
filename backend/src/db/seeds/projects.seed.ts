import {NewProjectInput} from "../../types/projects/schemas/projects";
import {projectsRepository} from "../../repositories/projects.repository";

export const projectsSeed = async () =>  {
    console.log('🌱 Starting seeding project...');
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
    await projectsRepository().createProject(projectData);
    console.log('✅ Seeding project complete!');
}
