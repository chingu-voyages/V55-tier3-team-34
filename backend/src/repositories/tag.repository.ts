import {db} from "../db/db";
import {tags} from "../db/schema";
import {ilike} from "drizzle-orm";
import {NewTag} from "../utils/types/tag/schema/tags";


export const tagRepository = () => {
    const createTags = (data: NewTag[]) => {
         return db.insert(tags).values(data);
    }
    const getAllTags = (searchTerm: string) => {
         return db
             .select(
                 {
                     tagId: tags.tagId,
                     name: tags.name,
                 }
             )
             .from(tags)
             .where(ilike(tags.name, "%"+ searchTerm + "%"))
             .limit(10)
    }

    return {
        createTags,
        getAllTags
    }
}
