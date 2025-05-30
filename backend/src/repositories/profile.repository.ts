import {users} from '../db/schema';
import {db} from '../db/db';
import {eq , getTableColumns , sql} from 'drizzle-orm';
import {UpdateUser} from '../db/schema/user';

export const profileRepository = () => {
  const getAllProfiles = (limit: number, offset: number) => {
    return db.query.users.findMany({
      limit,
      offset,
      columns: {
        userId: true,
        displayName: true,
        firstname: true,
        lastname: true,
        bio: true,
        avatarUrl: true,
        githubUrl: true,
      },
    });
  };

  const getProfileById = async (id: number) => {
    const {password, ...rest} = getTableColumns(users);
    return db.select({
      ...rest ,
    }).from(users).where(eq(users.userId , id));
  };
  const updateUserProfile = (userId: number, data: UpdateUser) => {
    return db
      .update(users)
      .set({
        updatedAt: sql`NOW()`,
        ...data,
      })
      .where(eq(users.userId, userId))
      .execute();
  };
  return {
    updateUserProfile,
    getAllProfiles,
    getProfileById,
  };
};
