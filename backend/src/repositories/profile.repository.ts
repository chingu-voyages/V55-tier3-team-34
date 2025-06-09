import {projectContributors , projects , projectTags , roles , tags , users} from '../db/schema';
import {db} from '../db/db';
import {and , eq , getTableColumns , sql} from 'drizzle-orm';
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
        createdAt: true
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
  async function getUserProjectsWithRoles(userId: number) {
    return await db.query.projects.findMany({
      where: (projects, { exists, and, eq }) =>
          exists(
              db.select({ projectId: projectContributors.projectId, contributorId: projectContributors.contributorId })
                  .from(projectContributors)
                  .where((pc) =>
                      and(
                          eq(pc.projectId, projects.projectId),
                          eq(pc.contributorId, userId)
                      )
                  )
          ),
      with: {
        contributors: {
          columns: {},
          with: {
            contributor: {
              columns: {
                userId: true,
                displayName: true,
                firstname: true,
                lastname: true,
              },
            },
            role: true,
          },
        },
        tags: {
          with: {
            tag: true,
          },
        },
      },
    });
  }
  return {
    updateUserProfile,
    getAllProfiles,
    getProfileById,
    getUserProjectsWithRoles,
  };
};
