"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_github2_1 = require("passport-github2");
const passport_local_1 = require("passport-local");
const config_1 = __importDefault(require("../../../config/config"));
const user_repository_1 = require("../../../repositories/user.repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.default = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.userId);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await (0, user_repository_1.userRepository)().findUserById(id);
            if (!user)
                return done(null, false);
            done(null, user);
        }
        catch (e) {
            done(e);
        }
    });
    passport.use(new passport_github2_1.Strategy({
        clientID: config_1.default.githubClientId,
        clientSecret: config_1.default.githubClientSecret,
        callbackURL: config_1.default.githubCallbackUrl,
    }, async function verify(accessToken, refreshToken, profile, done) {
        try {
            const user = await (0, user_repository_1.userRepository)().findOrCreateUser({
                provider: 'github',
                providerUserId: profile.id,
                email: profile.emails?.[0]?.value,
                avatarUrl: profile.photos?.[0]?.value,
                displayName: profile.displayName,
            });
            if (!user)
                return done(null, undefined);
            return done(null, user);
        }
        catch (e) {
            return done(e);
        }
    }));
    passport.use(new passport_local_1.Strategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try {
            const user = await (0, user_repository_1.userRepository)().findUserByEmail(email);
            if (!user || !user.password) {
                return done(null, false, { message: 'Invalid email or password' });
            }
            const isValidPassword = await bcrypt_1.default.compare(password, user.password);
            if (!isValidPassword) {
                return done(null, false, { message: 'Invalid email or password' });
            }
            return done(null, user);
        }
        catch (error) {
            return done(error);
        }
    }));
};
