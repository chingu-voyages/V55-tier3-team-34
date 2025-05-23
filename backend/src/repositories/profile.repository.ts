import {users} from "../db/schema";
import {db} from "../db/db";
import {eq , sql} from "drizzle-orm";
import {UpdateUser} from "../db/schema/user";


export const profileRepository = () => {
    const getAllProfiles = (limit: number, offset: number) => {
          return db.query.users.findMany({
                  limit,
                  offset
          })
    }

    const getProfileById = (id: number) => {
        return db.query.users.findFirst({
            where: eq(users.userId, id)
        })
    }
    const updateUserProfile = ( userId: number, data: UpdateUser) => {
          return  db.update(users).set({
              updatedAt: sql`NOW()`,
              ...data,
          }).where(eq(users.userId, userId)).execute()
    }
    return {
        updateUserProfile,
        getAllProfiles,
        getProfileById
    }
}
