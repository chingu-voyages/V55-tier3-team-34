import {tagRepository} from "../../repositories/tag.repository";
import {techTags} from "../data/tags";


export const tagsSeed = async () => {
    console.log('📝 Creating tags...');
    await tagRepository().createTags(techTags);
    console.log(`✅ Created ${techTags.length} tags successfully!`);
}
