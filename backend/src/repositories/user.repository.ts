import { federatedCredentials, FederatedCredentialWithUser, User, users } from "../db/schema/user";
import { db } from "../db/db";
import { and, eq } from "drizzle-orm";

type CreateOrUpdateDto = {
  email: string;
  displayName?: string;
  providerUserId: string;
  provider: string;
  avatarUrl?: string;
};

export const userRepository = () => {
  const findUserById = async (id: number): Promise<User | undefined> => {
    return db.query.users.findFirst({ where: eq(users.userId, id) });
  };

  const findUserByEmail = async (email: string): Promise<User | undefined> => {
    return db.query.users.findFirst({ where: eq(users.email, email) });
  };

  const findOrCreateUser = async (userData: CreateOrUpdateDto): Promise<User | undefined> => {
    const existingFederated = await db.query.federatedCredentials.findFirst({
      where: and(
        eq(federatedCredentials.provider, userData.provider),
        eq(federatedCredentials.providerUserId, userData.providerUserId)
      ),
      with: { user: true }
    }) as FederatedCredentialWithUser | undefined;

    if (existingFederated) {
      return existingFederated.user;
    }

    const existingUser = await findUserByEmail(userData.email);
    let userId: number;

    if (existingUser) {
      userId = existingUser.userId;
    } else {
      const [createdUser] = await db.insert(users).values({
        email: userData.email,
        displayName: userData.displayName,
        avatarUrl: userData.avatarUrl
      }).returning();
      userId = createdUser.userId;
    }

    await db.insert(federatedCredentials).values({
      userId,
      provider: userData.provider,
      providerUserId: userData.providerUserId
    });

    return await findUserById(userId);
  };

  const createUser = async ({
    email,
    password,
    firstname,
    lastname
  }: {
    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
  }) => {
    const [user] = await db.insert(users).values({
      email,
      password,
      firstname,
      lastname
    }).returning();
    return user;
  };

  return {
    findOrCreateUser,
    findUserById,
    findUserByEmail,
    createUser
  };
};
