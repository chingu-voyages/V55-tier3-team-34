import {PassportStatic , Profile} from 'passport';
import {Strategy as GithubStrategy } from "passport-github2"
import config from "../../../config/config";
import { userRepository} from "../../../repositories/user.repository";
import {  User} from "../../../db/schema/user";


export type PassportCallback = (error: any, user?: User) => void
export default (passport: PassportStatic) => {
    passport.serializeUser<any, any>((req, user, done) => {
        done(undefined, user);
    });
    passport.deserializeUser(async (id: number, done)=> {
        try {
            const user = await userRepository().findUserById(id);
            if(!user) return done(null, false)
            done(null, user);
        } catch (e) {
            done(e);
        }
    })

    passport.use(new GithubStrategy({
        clientID: config.githubClientId,
        clientSecret: config.githubClientSecret,
        callbackURL: config.githubCallbackUrl
    }, async function verify(accessToken: string, refreshToken: string, profile: Profile, done: PassportCallback) {
         try {
             const user = await userRepository().findOrCreateUser(
                 {
                     provider: "github" ,
                     providerUserId: profile.id ,
                     email: profile.emails?.[0]?.value!,
                     avatarUrl: profile.photos?.[0]?.value,
                     displayName: profile.displayName
                 }
             )
             if(!user) return  done(null, undefined)
             return done(null, user)
         }catch (e) {
             return done(e)
         }

    }))
}

