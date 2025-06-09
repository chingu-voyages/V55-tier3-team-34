"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const user_1 = require("../db/schema/user");
const db_1 = require("../db/db");
const drizzle_orm_1 = require("drizzle-orm");
const userRepository = () => {
    const findUserById = async (id) => {
        return db_1.db.query.users.findFirst({ where: (0, drizzle_orm_1.eq)(user_1.users.userId, id) });
    };
    const findUserByEmail = async (email) => {
        return db_1.db.query.users.findFirst({ where: (0, drizzle_orm_1.eq)(user_1.users.email, email) });
    };
    const findOrCreateUser = async (userData) => {
        const existingFederated = await db_1.db.query.federatedCredentials.findFirst({
            where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(user_1.federatedCredentials.provider, userData.provider), (0, drizzle_orm_1.eq)(user_1.federatedCredentials.providerUserId, userData.providerUserId)),
            with: { user: true }
        });
        if (existingFederated) {
            return existingFederated.user;
        }
        const existingUser = await findUserByEmail(userData.email);
        let userId;
        if (existingUser) {
            userId = existingUser.userId;
        }
        else {
            const [createdUser] = await db_1.db.insert(user_1.users).values({
                email: userData.email,
                displayName: userData.displayName,
                avatarUrl: userData.avatarUrl
            }).returning();
            userId = createdUser.userId;
        }
        await db_1.db.insert(user_1.federatedCredentials).values({
            userId,
            provider: userData.provider,
            providerUserId: userData.providerUserId
        });
        return await findUserById(userId);
    };
    const createUser = async ({ email, password, firstname, lastname }) => {
        const [user] = await db_1.db.insert(user_1.users).values({
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
exports.userRepository = userRepository;
