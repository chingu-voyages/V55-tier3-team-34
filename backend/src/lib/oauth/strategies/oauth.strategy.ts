import { PassportStatic, Profile } from 'passport';
import { Strategy as GithubStrategy } from 'passport-github2';
import { Strategy as LocalStrategy } from 'passport-local';
import config from '../../../config/config';
import { userRepository } from '../../../repositories/user.repository';
import { User } from '../../../db/schema/user';
import bcrypt from 'bcrypt';

export type PassportCallback = (error: any, user?: User) => void;

export default (passport: PassportStatic) => {
    passport.serializeUser((user: any, done) => {
        done(null, user.userId);
    });


  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await userRepository().findUserById(id);
      if (!user) return done(null, false);
      done(null, user);
    } catch (e) {
      done(e);
    }
  });

  passport.use(
    new GithubStrategy(
      {
        clientID: config.githubClientId,
        clientSecret: config.githubClientSecret,
        callbackURL: config.githubCallbackUrl,
      },
      async function verify(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: PassportCallback,
      ) {
        try {
          const user = await userRepository().findOrCreateUser({
            provider: 'github',
            providerUserId: profile.id,
            email: profile.emails?.[0]?.value!,
            avatarUrl: profile.photos?.[0]?.value,
            displayName: profile.displayName,
          });
          if (!user) return done(null, undefined);
          return done(null, user);
        } catch (e) {
          return done(e);
        }
      },
    ),
  );

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await userRepository().findUserByEmail(email);
          if (!user || !user.password) {
  return done(null, false, { message: 'Invalid email or password' });
}
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) {
            return done(null, false, { message: 'Invalid email or password' });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
};
