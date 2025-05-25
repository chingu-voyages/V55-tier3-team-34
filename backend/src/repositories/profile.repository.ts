import { users } from '../db/schema';
import { db } from '../db/db';
import { eq, sql } from 'drizzle-orm';
import { UpdateUser } from '../db/schema/user';

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

  const getProfileById = (id: number) => {
    return db.query.users.findFirst({
      where: eq(users.userId, id),
      columns: {
        userId: true,
        displayName: true,
        firstname: true,
        lastname: true,
        bio: true,
        avatarUrl: true,
        githubUrl: true,
      },
      with: {
        userVoyages: {
          with: {
            voyage: true,
          },
        },
      },
    });
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
